<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username'      => 'required|string',
            'password'      => 'required|string',
            'captcha_token' => 'required|string',
        ]);

        // En producción se valida el token contra Google. En local el widget es suficiente.
        if (config('app.env') !== 'local') {
            $captcha = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret'   => config('services.recaptcha.secret'),
                'response' => $request->captcha_token,
                'remoteip' => $request->ip(),
            ]);

            if (! $captcha->json('success')) {
                return response()->json(['message' => 'Verificación CAPTCHA fallida. Intentá de nuevo.'], 422);
            }
        }

        $usuario = Usuario::where('username', $request->username)->first();

        if (! $usuario || ! Hash::check($request->password, $usuario->password)) {
            throw ValidationException::withMessages([
                'username' => ['Las credenciales no son correctas.'],
            ]);
        }

        $token = $usuario->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token'   => $token,
            'usuario' => [
                'id'       => $usuario->id,
                'username' => $usuario->username,
                'email'    => $usuario->email,
                'tipo'     => $usuario->tipo,
                'estado'   => $usuario->estado,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente.']);
    }
}
