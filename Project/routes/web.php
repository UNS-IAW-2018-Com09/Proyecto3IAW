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

Route::get('/','HomePageController@render');

Route::post('/guardarLocal','DataBaseController@save');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/getLocales','DataBaseController@get');
