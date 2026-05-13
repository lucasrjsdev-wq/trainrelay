<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\RegistroController;

Route::post('/login',            [AuthController::class, 'login']);
Route::post('/registrarse',      [RegistroController::class, 'registrar']);
Route::post('/forgot-password',  [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password',   [PasswordResetController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', fn(Request $request) => $request->user());

    Route::get('/usuarios', [UsuarioController::class, 'index']);
    Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);
    Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
    Route::post('/usuarios/{id}/foto', [UsuarioController::class, 'subirFoto']);
    Route::post('/usuarios/{id}/chequear-suscripcion', [UsuarioController::class, 'chequearSuscripcion']);
    Route::post('/usuarios/{id}/suspender', [UsuarioController::class, 'suspender']);
    Route::post('/usuarios/{id}/rehabilitar', [UsuarioController::class, 'rehabilitar']);
    Route::patch('/usuarios/{id}/estado', [UsuarioController::class, 'updateEstado']);

    Route::prefix('dashboard')->group(function () {
        Route::get('/resumen-usuarios',       [DashboardController::class, 'resumenUsuarios']);
        Route::get('/registros-por-mes',      [DashboardController::class, 'registrosPorMes']);
        Route::get('/suscripciones-por-mes',  [DashboardController::class, 'suscripcionesPorMes']);
        Route::get('/usuarios-por-pais',      [DashboardController::class, 'usuariosPorPais']);
    });
});
