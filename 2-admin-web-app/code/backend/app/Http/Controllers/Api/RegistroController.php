<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Perfil;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegistroController extends Controller
{
    public function registrar(Request $request)
    {
        $request->validate([
            'nombre'   => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'email'    => 'required|email|unique:usuarios,email',
            'username' => 'required|string|max:50|unique:usuarios,username',
            'tipo'     => 'required|in:entrenador,atleta',
        ]);

        $usuario = Usuario::create([
            'username' => $request->username,
            'email'    => $request->email,
            'password' => Hash::make(\Illuminate\Support\Str::random(32)),
            'tipo'     => $request->tipo,
            'estado'   => 'registrado',
        ]);

        Perfil::create([
            'usuario_id' => $usuario->id,
            'nombre'     => $request->nombre,
            'apellido'   => $request->apellido,
        ]);

        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token'   => $token,
            'usuario' => $usuario->load('perfil'),
        ], 201);
    }
}
