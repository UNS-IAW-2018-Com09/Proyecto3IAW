<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Locales;


class DataBaseController{

  public function save(Request $request){
    $local=Locales::where('nombre','=','Club Universitario')->get()->first();
    $local->direccion="Fuerte 322";
    $local->save();
  }

  public function get(){
    return Locales::all();
  }

}
