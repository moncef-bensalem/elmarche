<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Fresh Salmon',
                'description' => 'Premium fresh Atlantic salmon, perfect for sushi or grilling',
                'price' => 24.99,
                'stock' => 50,
                'image' => 'salmon.jpg',
                'image_url' => 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                'weight' => 1.5
            ],
            [
                'name' => 'Tuna Steak',
                'description' => 'Wild-caught tuna steaks, rich in omega-3',
                'price' => 29.99,
                'stock' => 40,
                'image' => 'tuna.jpg',
                'image_url' => 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                'weight' => 1.0
            ],
            [
                'name' => 'Sea Bass',
                'description' => 'Fresh Mediterranean sea bass, ideal for baking',
                'price' => 19.99,
                'stock' => 30,
                'image' => 'seabass.jpg',
                'image_url' => 'https://images.unsplash.com/photo-1580554530778-0998e851b975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                'weight' => 1.2
            ],
            [
                'name' => 'Shrimp',
                'description' => 'Large tiger shrimp, deveined and ready to cook',
                'price' => 15.99,
                'stock' => 100,
                'image' => 'shrimp.jpg',
                'image_url' => 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                'weight' => 0.5
            ],
            [
                'name' => 'Lobster',
                'description' => 'Live Maine lobster, fresh from the Atlantic',
                'price' => 39.99,
                'stock' => 20,
                'image' => 'lobster.jpg',
                'image_url' => 'https://images.unsplash.com/photo-1550747545-c896b5f89ff7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                'weight' => 2.0
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
