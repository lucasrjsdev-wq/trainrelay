<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CoachController extends Controller
{
    public function actualizarPerfil(Request $request)
    {
        $usuario = $request->user();

        $data = $request->validate([
            'nombre'    => 'nullable|string|max:100',
            'apellido'  => 'nullable|string|max:100',
            'documento' => 'nullable|string|max:50',
            'telefono'  => 'nullable|string|max:30',
            'ciudad'    => 'nullable|string|max:100',
            'pais'      => 'nullable|string|max:100',
            'password'  => 'nullable|string|min:6|confirmed',
        ]);

        $usuario->perfil()->updateOrCreate(
            ['usuario_id' => $usuario->id],
            collect($data)->only(['nombre', 'apellido', 'documento', 'telefono', 'ciudad', 'pais'])->toArray()
        );

        if (!empty($data['password'])) {
            $usuario->update(['password' => Hash::make($data['password'])]);
        }

        return response()->json($usuario->fresh()->load('perfil', 'suscripcion'));
    }

    public function cambiarPassword(Request $request)
    {
        $data = $request->validate([
            'password' => 'required|string|min:6|confirmed',
        ]);

        $request->user()->update(['password' => Hash::make($data['password'])]);

        return response()->json(['message' => 'Contraseña actualizada.']);
    }

    public function iniciarSuscripcion(Request $request)
    {
        // Placeholder — se implementa en UC2 con MercadoPago
        return response()->json(['message' => 'Funcionalidad de suscripción próximamente.'], 501);
    }
}
