
var map;
var newmarker;
var bounds;
var AlmacenamientoLocales=new Map();
var markers=[];
var dias=["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];

function initMap() {
  var mapProp= {
    center:new google.maps.LatLng(-38.7167,-62.2833),
    zoom:13,
    mapTypeControl:false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map=new google.maps.Map(document.getElementById("map"),mapProp);
  bounds=new google.maps.LatLngBounds();
  $.get("/EstiloMapa1.json",function(data){
    map.setOptions(data);
  });

  map.addListener('click',function(event){
    if (newmarker!=null)
      newmarker.setMap(null);
    newmarker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      title: 'Nuevo local'
  });
    borrarInfo();
    $("input[name=campoLatitud]").val(event.latLng.lat);
    $("input[name=campoLongitud]").val(event.latLng.lng);

  });

  cargarLocales();
}

function borrarInfo(){
  $(":input[type=text]").val("");
  $(":input[type=number]").val("");
  $(":input[type=checkbox]:checked").trigger("click");
}

function cargarLocales(){
  $.get('/getLocales',function(data,status){
    console.log(data);
    var locales=data;
    for(var i=0;i<locales.length;i++){
      AlmacenamientoLocales.set(locales[i].nombre,locales[i]);
      var marker=new google.maps.Marker({
        position:{"lat":locales[i]["ubicacion"][0],"lng":locales[i]["ubicacion"][1]},
        title:locales[i]["nombre"],
        icon:'/images/'+locales[i]["tipo"]+'.png',
        map:map,
      });
      markers.push(marker);
      bounds.extend(new google.maps.LatLng(marker.position.lat(),marker.position.lng()));
      (function (marker,i) {
                google.maps.event.addListener(marker, "click", function (i) {
                  if (newmarker!=null)
                    newmarker.setMap(null);
                  borrarInfo();
                  fillInformation(marker.title);
                });
            })(marker, data);
    }
    map.fitBounds(bounds);
    map.panToBounds(bounds);
  });
}

function fillInformation(local){
  var objLocal=AlmacenamientoLocales.get(local);
  $("input[name=campoNombre]").val(objLocal.nombre);
  $("#option"+objLocal.tipo).attr('selected','true');
  $("input[name=campoLongitud]").val(objLocal.ubicacion[1]);
  $("input[name=campoLatitud]").val(objLocal.ubicacion[0]);
  $("input[name=campoTelefono]").val(objLocal.telefono);
  $("input[name=campoDireccion]").val(objLocal.direccion);
  $("input[name=campoFacebook]").val(objLocal.facebook);
  $("input[name=campoID]").val(objLocal._id);

  var i=0;
  dias.forEach(function(element){
    $("input[name="+element+"]").trigger("click");
  });

  objLocal.horario.forEach(function(element){
    $("input[name="+element.Dia+"]").trigger("click");
    setearHora(element);
  });

}

function setearHora(element){
  var open=element.horarioApertura.split(":");
  var close=element.horarioCierra.split(":");
  $("input[name=horaApertura"+element.Dia+"]").val(open[0]);
  $("input[name=minutosApertura"+element.Dia+"]").val(open[1]);
  $("input[name=horaCierre"+element.Dia+"]").val(close[0]);
  $("input[name=minutosCierre"+element.Dia+"]").val(close[1]);
}

function descheckear(event){
  var dia=event.getAttribute("name");
  var estaClickeado=event.checked;
  $("input[name=horaApertura"+dia+"]").prop("disabled",estaClickeado);
  $("input[name=minutosApertura"+dia+"]").prop("disabled",estaClickeado);
  $("input[name=horaCierre"+dia+"]").prop("disabled",estaClickeado);
  $("input[name=minutosCierre"+dia+"]").prop("disabled",estaClickeado);
  if (!estaClickeado){
      $("#hora"+dia).css("background-color","#EDBB99");
  }
  else{
    $("#hora"+dia).css("background-color","#D5D8DC");
  }
}
