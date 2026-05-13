<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Perfil;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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
            'password' => Hash::make(Str::random(32)),
            'tipo'     => $request->tipo,
            'estado'   => 'registrado',
        ]);

        Perfil::create([
            'usuario_id' => $usuario->id,
            'nombre'     => $request->nombre,
            'apellido'   => $request->apellido,
        ]);

        $token = Str::random(64);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $usuario->email],
            ['token' => Hash::make($token), 'created_at' => now()]
        );

        $setPasswordUrl = config('app.frontend_url', 'http://localhost:5173')
            . '/nueva-contrasena?token=' . $token
            . '&email=' . urlencode($usuario->email);

        Mail::send(
            'emails.set-password',
            ['setPasswordUrl' => $setPasswordUrl, 'usuario' => $usuario],
            fn($m) => $m->to($usuario->email)->subject('Bienvenido a TrainRelay — Configurá tu contraseña')
        );

        return response()->json([
            'message' => 'Su usuario fue creado exitosamente. En breve se comunicarán con usted via correo electrónico para definir las funcionalidades.'
        ], 201);
    }
}
