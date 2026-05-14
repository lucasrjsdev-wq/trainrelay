<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CoachMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $usuario = $request->user();

        if (!$usuario || $usuario->tipo !== 'entrenador') {
            return response()->json(['message' => 'Acceso no autorizado.'], 403);
        }

        if ($usuario->estado === 'suspendido') {
            return response()->json(['message' => 'Tu cuenta está suspendida.'], 403);
        }

        return $next($request);
    }
}
