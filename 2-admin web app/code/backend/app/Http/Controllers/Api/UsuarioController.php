<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Services\SuscripcionMpService;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function index(Request $request)
    {
        $query = Usuario::with(['perfil', 'suscripcion'])
            ->whereIn('tipo', ['entrenador', 'atleta']);

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->filled('buscar')) {
            $buscar = $request->buscar;
            $query->where(function ($q) use ($buscar) {
                $q->where('username', 'like', "%{$buscar}%")
                  ->orWhere('email', 'like', "%{$buscar}%")
                  ->orWhereHas('perfil', function ($q2) use ($buscar) {
                      $q2->where('nombre', 'like', "%{$buscar}%")
                         ->orWhere('apellido', 'like', "%{$buscar}%");
                  });
            });
        }

        $usuarios = $query->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 15));

        return response()->json($usuarios);
    }

    public function show($id)
    {
        $usuario = Usuario::with(['perfil', 'suscripcion'])
            ->whereIn('tipo', ['entrenador', 'atleta'])
            ->findOrFail($id);

        return response()->json($this->conFotoUrl($usuario));
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::with(['perfil', 'suscripcion'])
            ->whereIn('tipo', ['entrenador', 'atleta'])
            ->findOrFail($id);

        $request->validate([
            'username'           => ['required', 'string', 'max:50', Rule::unique('usuarios', 'username')->ignore($usuario->id)],
            'email'              => ['required', 'email', Rule::unique('usuarios', 'email')->ignore($usuario->id)],
            'tipo'               => ['required', Rule::in(['entrenador', 'atleta'])],
            'estado'             => ['required', function ($attr, $val, $fail) use ($request) {
                $validos = match($request->tipo) {
                    'atleta'     => ['registrado', 'entrenando'],
                    'entrenador' => ['registrado', 'suscripto_a_validar', 'suscripto', 'sin_suscripcion'],
                    default      => ['registrado'],
                };
                if (!in_array($val, $validos)) {
                    $fail("El estado '{$val}' no es válido para el tipo '{$request->tipo}'.");
                }
            }],
            'nombre'             => ['nullable', 'string', 'max:100'],
            'apellido'           => ['nullable', 'string', 'max:100'],
            'documento'          => ['nullable', 'string', 'max:50'],
            'telefono'           => ['nullable', 'string', 'max:30'],
            'ciudad'             => ['nullable', 'string', 'max:100'],
            'pais'               => ['nullable', 'string', 'max:100'],
            'mp_subscription_id' => ['nullable', 'string', 'max:100'],
            'mp_payer_email'     => ['nullable', 'email'],
            'mp_estado'          => ['nullable', Rule::in(['authorized', 'paused', 'cancelled'])],
        ]);

        $usuario->update([
            'username' => $request->username,
            'email'    => $request->email,
            'tipo'     => $request->tipo,
            'estado'   => $request->estado,
        ]);

        $usuario->perfil()->updateOrCreate(
            ['usuario_id' => $usuario->id],
            [
                'nombre'    => $request->nombre,
                'apellido'  => $request->apellido,
                'documento' => $request->documento,
                'telefono'  => $request->telefono,
                'ciudad'    => $request->ciudad,
                'pais'      => $request->pais,
            ]
        );

        $usuario->suscripcion()->updateOrCreate(
            ['usuario_id' => $usuario->id],
            [
                'mp_subscription_id' => $request->mp_subscription_id,
                'mp_payer_email'     => $request->mp_payer_email,
                'mp_estado'          => $request->mp_estado,
            ]
        );

        return response()->json($this->conFotoUrl($usuario->fresh(['perfil', 'suscripcion'])));
    }

    public function subirFoto(Request $request, $id)
    {
        $usuario = Usuario::whereIn('tipo', ['entrenador', 'atleta'])->findOrFail($id);

        $request->validate([
            'foto' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $perfil = $usuario->perfil()->firstOrCreate(['usuario_id' => $usuario->id]);

        if ($perfil->foto) {
            Storage::disk('public')->delete($perfil->foto);
        }

        $path = $request->file('foto')->store('fotos-perfil', 'public');
        $perfil->update(['foto' => $path]);

        return response()->json([
            'foto_url' => Storage::disk('public')->url($path),
        ]);
    }

    public function chequearSuscripcion($id, SuscripcionMpService $mpService)
    {
        $usuario = Usuario::with(['suscripcion'])
            ->where('tipo', 'entrenador')
            ->findOrFail($id);

        $resultado = $mpService->chequearYActualizar($usuario);

        $status = $resultado['ok'] ? 200 : 422;
        return response()->json(
            array_merge($resultado, ['usuario' => $this->conFotoUrl($usuario->fresh(['perfil', 'suscripcion']))]),
            $status
        );
    }

    public function suspender($id)
    {
        $usuario = Usuario::whereIn('tipo', ['entrenador', 'atleta'])->findOrFail($id);

        if ($usuario->estado === 'suspendido') {
            return response()->json(['message' => 'El usuario ya está suspendido.'], 422);
        }

        $usuario->estado_previo = $usuario->estado;
        $usuario->estado        = 'suspendido';
        $usuario->save();

        return response()->json($this->conFotoUrl($usuario->fresh(['perfil', 'suscripcion'])));
    }

    public function rehabilitar($id)
    {
        $usuario = Usuario::whereIn('tipo', ['entrenador', 'atleta'])->findOrFail($id);

        if ($usuario->estado !== 'suspendido') {
            return response()->json(['message' => 'El usuario no está suspendido.'], 422);
        }

        $usuario->estado        = $usuario->estado_previo ?? 'registrado';
        $usuario->estado_previo = null;
        $usuario->save();

        return response()->json($this->conFotoUrl($usuario->fresh(['perfil', 'suscripcion'])));
    }

    public function updateEstado(Request $request, $id)
    {
        $usuario = Usuario::whereIn('tipo', ['entrenador', 'atleta'])->findOrFail($id);

        $estadosValidos = match($usuario->tipo) {
            'atleta'     => ['registrado', 'entrenando'],
            'entrenador' => ['registrado', 'suscripto_a_validar', 'suscripto', 'sin_suscripcion'],
            default      => ['registrado'],
        };

        $request->validate([
            'estado' => ['required', Rule::in($estadosValidos)],
        ]);

        $usuario->estado = $request->estado;
        $usuario->save();

        return response()->json(['usuario' => $usuario->load(['perfil', 'suscripcion'])]);
    }

    private function conFotoUrl(Usuario $usuario): array
    {
        $data = $usuario->toArray();
        if ($usuario->perfil?->foto) {
            $data['perfil']['foto_url'] = Storage::disk('public')->url($usuario->perfil->foto);
        } else {
            $data['perfil']['foto_url'] = null;
        }
        return $data;
    }
}
