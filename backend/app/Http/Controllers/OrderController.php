<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->is_admin ? 
            Order::with('products')->get() : 
            Order::where('user_id', $request->user()->id)->with('products')->get();
            
        return response()->json($orders);
    }

    public function show(Order $order, Request $request)
    {
        if (!$request->user()->is_admin && $order->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json($order->load('products'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            DB::beginTransaction();

            $total = 0;
            $orderProducts = [];

            foreach ($request->products as $item) {
                $product = Product::find($item['id']);
                
                if ($product->stock < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->name}");
                }

                $product->stock -= $item['quantity'];
                $product->save();

                $total += $product->price * $item['quantity'];
                $orderProducts[$item['id']] = [
                    'quantity' => $item['quantity'],
                    'price' => $product->price
                ];
            }

            $order = Order::create([
                'user_id' => $request->user()->id,
                'total_amount' => $total,
                'status' => 'pending',
                'shipping_address' => $request->shipping_address,
                'payment_status' => 'pending'
            ]);

            $order->products()->attach($orderProducts);

            DB::commit();

            return response()->json($order->load('products'), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $order->status = $request->status;
        $order->save();

        return response()->json($order);
    }
}
