<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Agregar suspendido al ENUM y la columna estado_previo
        DB::statement("
            ALTER TABLE usuarios
            MODIFY COLUMN estado ENUM(
                'registrado',
                'entrenando',
                'suscripto_a_validar',
                'suscripto',
                'sin_suscripcion',
                'suspendido',
                'dueno'
            ) NOT NULL DEFAULT 'registrado'
        ");

        Schema::table('usuarios', function (Blueprint $table) {
            $table->string('estado_previo')->nullable()->after('estado');
        });
    }

    public function down(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('estado_previo');
        });

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
};
