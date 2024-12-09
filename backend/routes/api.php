<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::get('products', [ProductController::class, 'index']);
Route::get('products/{product}', [ProductController::class, 'show']);

Route::middleware('auth:api')->group(function () {
    // User routes
    Route::get('user', function (Request $request) {
        return $request->user();
    });
    
    // Order routes
    Route::post('orders', [OrderController::class, 'store']);
    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{order}', [OrderController::class, 'show']);
    
    // Payment routes
    Route::post('payment/create-intent', [PaymentController::class, 'createPaymentIntent']);
});

// Admin routes
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('products', [ProductController::class, 'store']);
    Route::put('products/{product}', [ProductController::class, 'update']);
    Route::delete('products/{product}', [ProductController::class, 'destroy']);
    
    Route::put('orders/{order}/status', [OrderController::class, 'updateStatus']);
});

// Stripe webhook
Route::post('webhook/stripe', [PaymentController::class, 'handleWebhook']);
