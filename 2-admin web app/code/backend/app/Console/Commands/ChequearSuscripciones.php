<?php

namespace App\Console\Commands;

use App\Models\Usuario;
use App\Services\SuscripcionMpService;
use Illuminate\Console\Command;

class ChequearSuscripciones extends Command
{
    protected $signature   = 'chequear:suscripciones';
    protected $description = 'Chequea el estado de suscripciones MP de todos los entrenadores y actualiza sus estados.';

    public function handle(SuscripcionMpService $mpService): int
    {
        $entrenadores = Usuario::with('suscripcion')
            ->where('tipo', 'entrenador')
            ->whereHas('suscripcion', fn($q) => $q->whereNotNull('mp_subscription_id'))
            ->get();

        if ($entrenadores->isEmpty()) {
            $this->info('No hay entrenadores con suscripción MP registrada.');
            return self::SUCCESS;
        }

        $this->info("Chequeando {$entrenadores->count()} entrenador(es)...");
        $bar = $this->output->createProgressBar($entrenadores->count());
        $bar->start();

        $ok = $err = 0;

        foreach ($entrenadores as $entrenador) {
            $resultado = $mpService->chequearYActualizar($entrenador);
            $resultado['ok'] ? $ok++ : $err++;
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Completado: {$ok} actualizados, {$err} con error.");

        return self::SUCCESS;
    }
}
