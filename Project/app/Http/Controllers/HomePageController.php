<?php

namespace App\Http\Controllers;

class HomePageController{
  public function render(){
    return view('layout');
  }

  public function readme(){
    return view('readme');
  }
}
