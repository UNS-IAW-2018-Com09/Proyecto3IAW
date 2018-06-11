<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Locales;
use \stdClass;

use Cloudinary\src\Api;
use Cloudinary\src\Cloudinary;
use Cloudinary\src\Uploader;


class DataBaseController{

  public function save(Request $request){
    $dias=array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado");
    $horarios=array();
    var_dump($_POST);
    $local=Locales::where('_id','=',$_POST["campoID"])->get()->first();
    if ($local==null){
      $local=new Locales();
    }
    $local->direccion=$_POST["campoDireccion"];
    $local->telefono=$_POST["campoTelefono"];
    $local->facebook=$_POST["campoFacebook"];
    $local->nombre=$_POST["campoNombre"];
    $local->tipo=$_POST["campoTipo"];
    $local->ubicacion=[floatval($_POST["campoLatitud"]),floatval($_POST["campoLongitud"])];
    $auxiliar_horarios=array();
    foreach($dias as $dia){
      if (!($request->has($dia))){
        array_push($horarios,$dia);
      }
    }
    $i=0;
    foreach($horarios as $dia){
      $local_aux=new stdClass;
      $local_aux->Dia=$dia;
      $local_aux->horarioApertura=$_POST["horaApertura".$dia].":".$_POST["minutosApertura".$dia];
      $local_aux->horarioCierra=$_POST["horaCierre".$dia].":".$_POST["minutosCierre".$dia];
      array_push($auxiliar_horarios,$local_aux);
    }
    $local->horario=$auxiliar_horarios;
    $local->save();
    return redirect('/');
  }

  public function get(){
    return Locales::all();
  }

  public function delete(){
    $local=Locales::where('_id','=',$_POST["campoID"])->get()->first();
    $local->delete();
    return redirect('/');
  }

}
