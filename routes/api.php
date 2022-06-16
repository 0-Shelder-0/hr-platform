<?php

use App\Http\Controllers\AuthorizationController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\MentorController;
use App\Http\Controllers\StudyDirectionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthorizationController::class, 'login']);
    Route::post('/register', [AuthorizationController::class, 'register']);
    Route::post('/logout', [AuthorizationController::class, 'logout']);
    Route::post('/refresh', [AuthorizationController::class, 'refresh']);
});

Route::group([
    'prefix' => 'study-direction'
], function () {
    Route::post('/create', [StudyDirectionController::class, 'create']);
});

Route::group([
    'prefix' => 'mentor'
], function () {
    Route::post('/create', [MentorController::class, 'create']);
});

Route::group([
    'prefix' => 'course'
], function () {
    Route::post('/create', [CourseController::class, 'create']);
    Route::post('/set-user', [CourseController::class, 'setUser']);
});
