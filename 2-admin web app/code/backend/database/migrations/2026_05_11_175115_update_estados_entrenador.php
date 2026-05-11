<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Paso 1: ampliar ENUM conservando valores viejos + agregando los nuevos
        DB::statement("
            ALTER TABLE usuarios
            MODIFY COLUMN estado ENUM(
                'registrado',
                'entrenando',
                'suscripto_a_validar',
                'suscripto',
                'sin_suscripcion',
                'activo',
                'suspendido',
                'dueno'
            ) NOT NULL DEFAULT 'registrado'
        ");

        // Paso 2: migrar datos de entrenadores
        DB::table('usuarios')->where('tipo', 'entrenador')->where('estado', 'activo')->update(['estado' => 'suscripto']);
        DB::table('usuarios')->where('tipo', 'entrenador')->where('estado', 'suspendido')->update(['estado' => 'sin_suscripcion']);

        // Paso 3: quitar valores obsoletos del ENUM
        DB::statement("
            ALTER TABLE usuarios
            MODIFY COLUMN estado ENUM(
                'registrado',
                'entrenando',
                'suscripto_a_validar',
                'suscripto',
                'sin_suscripcion',
                'dueno'
            ) NOT NULL DEFAULT 'registrado'
        ");
    }

    public function down(): void
    {
        DB::statement("
            ALTER TABLE usuarios
            MODIFY COLUMN estado ENUM(
                'registrado',
                'entrenando',
                'suscripto_a_validar',
                'suscripto',
                'sin_suscripcion',
                'activo',
                'suspendido',
                'dueno'
            ) NOT NULL DEFAULT 'registrado'
        ");

        DB::table('usuarios')->where('tipo', 'entrenador')->where('estado', 'suscripto')->update(['estado' => 'activo']);
        DB::table('usuarios')->where('tipo', 'entrenador')->where('estado', 'sin_suscripcion')->update(['estado' => 'suspendido']);

        DB::statement("
            ALTER TABLE usuarios
            MODIFY COLUMN estado ENUM(
                'registrado',
                'suscripto',
                'activo',
                'suspendido',
                'dueno'
            ) NOT NULL DEFAULT 'registrado'
        ");
    }
};
