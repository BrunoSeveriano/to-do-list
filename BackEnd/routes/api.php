<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

use App\Http\Controllers\TodoController;

Route::controller(TodoController::class)->group(function () {
    Route::get('/todos', 'list');
    Route::post('/todos', 'create');
    Route::delete('/todos/{id}', 'delete');
    Route::put('/todos/{id}', 'update');
});


