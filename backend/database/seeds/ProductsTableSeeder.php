<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'name' => 'Loup',
            'description' => 'the sea bass is a variety reaching more than 300g after 12 months in cages..',
            'price' => '22.99',
            'weight' => 'de 10 à 18 cm',
            'stock' => 20,
            'image' => 'loup.jpg',
            'created_at' => "2024-12-03 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'Mulet',
            'description' => 'The mesh size of the mullet, that is to say the minimum legal catch size for amateur and professional fishermen, is 30 cm in the English Channel, the Atlantic and the North Sea.',
            'price' => '9.99',
            'weight' => '70 cm',
            'stock' => 30,
            'image' => 'mulet.jpg',
            'created_at' => "2024-12-03 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'Daurade sauvage',
            'description' => 'The term sea bream or sea bream refers to several species of fish with good taste quality.',
            'price' => '47.80',
            'weight' => '50 cm',
            'stock' => 30,
            'image' => 'daurade.jpg',
            'created_at' => "2024-12-03 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'Bonite blanc',
            'description' => 'Bonito is the vernacular name given to several species of fish in the Scombridae family (Scombridae).',
            'price' => '14.99',
            'weight' => '70 cm',
            'stock' => 15,
            'image' => 'bonite.jpg',
            'created_at' => "2024-12-03 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'Rouget rouge',
            'description' => 'is a species of marine fish, carnivorous, feeding mainly on the bottom1,2, of the family Mullidae.',
            'price' => '35.99',
            'weight' => '40 cm',
            'stock' => 32,
            'image' => 'rouget.jpg',
            'created_at' => "2024-12-03 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'Crevette grand calibre royale',
            'description' => 'The large royal shrimp (Hariwake) is a variety of shrimp from the Scombridae family. It is original to the Western Atlantic, but is also known in the Northern Atlantic and the Northern North Sea.',
            'price' => '79.99',
            'weight' => '10 cm',
            'stock' => 50,
            'image' => 'crevette.jpg',
            'created_at' => "2024-12-03 04:36:56",
            'updated_at' => now(),
        ]);
        DB::table('products')->insert([
            'name' => 'Seriole Bichilimoni',
            'description' => 'is a large, silvery fish with firm, slightly oily flesh. Found in temperate and tropical waters, it is ideal for grilling, baking, or raw dishes like sushi.',
            'price' => '39.99',
            'weight' => '50 cm',
            'stock' => 40,
            'image' => 'Sériole.jpg',
            'created_at' => "2024-12-04 21:06:56",
            'updated_at' => now()
        ]);
    }
}
