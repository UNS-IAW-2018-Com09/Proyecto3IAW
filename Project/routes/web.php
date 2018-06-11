<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','HomeController@index');

Route::post('/guardarLocal','DataBaseController@save');

Route::post('/borrarLocal','DataBaseController@delete');

Auth::routes();

Route::get('/getLocales','DataBaseController@get');

Route::get('/logout','Auth\LoginController@logout');

Route::get('/readme','HomePageController@readme');
