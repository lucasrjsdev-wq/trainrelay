<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Actualizar usuarios atletas que tienen estados que ya no aplican
        DB::table('usuarios')
            ->where('tipo', 'atleta')
            ->whereIn('estado', ['suscripto', 'activo', 'suspendido'])
            ->update(['estado' => 'registrado']);
    }

    public function down(): void
    {
        // No reversible — los estados anteriores no se pueden recuperar
    }
};
