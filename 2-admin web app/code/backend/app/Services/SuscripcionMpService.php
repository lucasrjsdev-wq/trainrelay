<?php

namespace App\Services;

use App\Models\Usuario;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SuscripcionMpService
{
    private string $accessToken;
    private string $baseUrl = 'https://api.mercadopago.com';

    public function __construct()
    {
        $this->accessToken = config('services.mercadopago.access_token');
    }

    /**
     * Consulta el estado de una suscripción en MP y actualiza el usuario.
     * Retorna un array con el resultado del chequeo.
     */
    public function chequearYActualizar(Usuario $usuario): array
    {
        $suscripcion = $usuario->suscripcion;

        if (! $suscripcion?->mp_subscription_id) {
            return ['ok' => false, 'mensaje' => 'El usuario no tiene ID de suscripción MP.'];
        }

        try {
            $response = Http::withToken($this->accessToken)
                ->timeout(10)
                ->get("{$this->baseUrl}/preapproval/{$suscripcion->mp_subscription_id}");

            if ($response->failed()) {
                Log::warning('MP API error', [
                    'usuario_id' => $usuario->id,
                    'status'     => $response->status(),
                    'body'       => $response->body(),
                ]);
                return ['ok' => false, 'mensaje' => "Error al consultar MercadoPago (HTTP {$response->status()})."];
            }

            $mpEstado = $response->json('status');

            // Actualizar mp_estado en suscripciones
            $suscripcion->update(['mp_estado' => $mpEstado]);

            // Actualizar estado del usuario solo si no está suspendido por el dueño
            if ($usuario->estado !== 'suspendido') {
                $nuevoEstado = match($mpEstado) {
                    'authorized' => 'suscripto',
                    'paused', 'cancelled' => 'sin_suscripcion',
                    default => $usuario->estado,
                };

                if ($nuevoEstado !== $usuario->estado) {
                    $usuario->update(['estado' => $nuevoEstado]);
                }
            }

            $mpEstadoLabel = match($mpEstado) {
                'authorized' => 'Activa',
                'paused'     => 'Pausada',
                'cancelled'  => 'Cancelada',
                default      => $mpEstado,
            };

            return [
                'ok'        => true,
                'mp_estado' => $mpEstado,
                'mensaje'   => "Suscripción MP: {$mpEstadoLabel}. Estado del usuario actualizado.",
            ];

        } catch (\Exception $e) {
            Log::error('MP API exception', ['usuario_id' => $usuario->id, 'error' => $e->getMessage()]);
            return ['ok' => false, 'mensaje' => 'No se pudo conectar con MercadoPago.'];
        }
    }
}
