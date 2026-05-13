<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $usuario = Usuario::where('email', $request->email)->first();

        if ($usuario) {
            $token = Str::random(64);

            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $request->email],
                ['token' => Hash::make($token), 'created_at' => now()]
            );

            $resetUrl = config('app.frontend_url', 'http://localhost:5173')
                . '/nueva-contrasena?token=' . $token
                . '&email=' . urlencode($request->email);

            Mail::send(
                'emails.reset-password',
                ['resetUrl' => $resetUrl, 'usuario' => $usuario],
                fn($m) => $m->to($usuario->email)->subject('Recuperar contraseña — TrainRelay')
            );
        }

        // Siempre respuesta genérica para evitar enumeración de usuarios
        return response()->json([
            'message' => 'Si el correo está registrado, recibirás un enlace para recuperar tu contraseña.'
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email'                 => 'required|email',
            'token'                 => 'required|string',
            'password'              => 'required|string|min:8|confirmed',
        ]);

        $record = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (! $record || ! Hash::check($request->token, $record->token)) {
            return response()->json(['message' => 'El enlace no es válido o ha expirado.'], 422);
        }

        if (Carbon::parse($record->created_at)->addMinutes(60)->isPast()) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json(['message' => 'El enlace ha expirado. Solicitá uno nuevo.'], 422);
        }

        $usuario = Usuario::where('email', $request->email)->first();

        if (! $usuario) {
            return response()->json(['message' => 'Usuario no encontrado.'], 404);
        }

        $usuario->update(['password' => Hash::make($request->password)]);
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json([
            'message' => 'Contraseña actualizada correctamente. Ya podés iniciar sesión.'
        ]);
    }
}
