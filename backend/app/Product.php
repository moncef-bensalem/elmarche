<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    //
    use SoftDeletes;

    protected $appends = ['image_url'];

    public function orders()
    {
        return $this->belongsToMany(Role::class);
    }

    public function getImageUrlAttribute()
    {
        return $this->image ? url('images/products/' . $this->image) : null;
    }
}
