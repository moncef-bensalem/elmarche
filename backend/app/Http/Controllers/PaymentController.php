<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $order = Order::findOrFail($request->order_id);
            
            $paymentIntent = PaymentIntent::create([
                'amount' => $order->total_amount * 100, // Amount in cents
                'currency' => 'usd',
                'metadata' => [
                    'order_id' => $order->id
                ]
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function handleWebhook(Request $request)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));
            $payload = $request->all();
            $sig_header = $request->header('stripe-signature');
            $event = null;

            try {
                $event = \Stripe\Webhook::constructEvent(
                    $request->getContent(),
                    $sig_header,
                    config('services.stripe.webhook_secret')
                );
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 400);
            }

            if ($event->type === 'payment_intent.succeeded') {
                $paymentIntent = $event->data->object;
                $orderId = $paymentIntent->metadata->order_id;
                
                $order = Order::find($orderId);
                if ($order) {
                    $order->payment_status = 'paid';
                    $order->stripe_payment_id = $paymentIntent->id;
                    $order->save();
                }
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
