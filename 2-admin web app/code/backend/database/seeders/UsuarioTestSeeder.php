<?php

namespace Database\Seeders;

use App\Models\Usuario;
use App\Models\Perfil;
use App\Models\Suscripcion;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioTestSeeder extends Seeder
{
    public function run(): void
    {
        $usuarios = [
            // username, email, tipo, estado, nombre, apellido, pais, mp_subscription_id, mp_payer_email, mp_estado
            ['username' => 'coach_martinez', 'email' => 'martinez@example.com', 'tipo' => 'entrenador', 'estado' => 'activo',    'nombre' => 'Carlos',    'apellido' => 'Martínez', 'pais' => 'Argentina', 'mp_sub' => 'SUB-001-MP', 'mp_email' => 'carlos.mp@gmail.com',   'mp_estado' => 'authorized'],
            ['username' => 'coach_perez',    'email' => 'perez@example.com',    'tipo' => 'entrenador', 'estado' => 'registrado', 'nombre' => 'Ana',       'apellido' => 'Pérez',    'pais' => 'Argentina', 'mp_sub' => null,          'mp_email' => null,                    'mp_estado' => null],
            ['username' => 'coach_lopez',    'email' => 'lopez@example.com',    'tipo' => 'entrenador', 'estado' => 'suscripto',  'nombre' => 'Roberto',   'apellido' => 'López',    'pais' => 'Chile',     'mp_sub' => 'SUB-003-MP', 'mp_email' => 'roberto.mp@gmail.com',  'mp_estado' => 'authorized'],
            ['username' => 'coach_silva',    'email' => 'silva@example.com',    'tipo' => 'entrenador', 'estado' => 'suspendido', 'nombre' => 'Marina',    'apellido' => 'Silva',    'pais' => 'Uruguay',   'mp_sub' => 'SUB-004-MP', 'mp_email' => 'marina.mp@gmail.com',   'mp_estado' => 'cancelled'],
            ['username' => 'atleta_garcia',  'email' => 'garcia@example.com',   'tipo' => 'atleta',     'estado' => 'activo',    'nombre' => 'Juan',       'apellido' => 'García',   'pais' => 'Argentina', 'mp_sub' => 'SUB-005-MP', 'mp_email' => 'juan.mp@gmail.com',     'mp_estado' => 'authorized'],
            ['username' => 'atleta_torres',  'email' => 'torres@example.com',   'tipo' => 'atleta',     'estado' => 'activo',    'nombre' => 'Sofía',      'apellido' => 'Torres',   'pais' => 'Argentina', 'mp_sub' => 'SUB-006-MP', 'mp_email' => 'sofia.mp@outlook.com',  'mp_estado' => 'authorized'],
            ['username' => 'atleta_romero',  'email' => 'romero@example.com',   'tipo' => 'atleta',     'estado' => 'registrado', 'nombre' => 'Diego',     'apellido' => 'Romero',   'pais' => 'Brasil',    'mp_sub' => null,          'mp_email' => null,                    'mp_estado' => null],
            ['username' => 'atleta_vargas',  'email' => 'vargas@example.com',   'tipo' => 'atleta',     'estado' => 'suscripto',  'nombre' => 'Valentina', 'apellido' => 'Vargas',   'pais' => 'Colombia',  'mp_sub' => 'SUB-008-MP', 'mp_email' => 'valentina.mp@gmail.com','mp_estado' => 'paused'],
            ['username' => 'atleta_mendez',  'email' => 'mendez@example.com',   'tipo' => 'atleta',     'estado' => 'suspendido', 'nombre' => 'Pablo',     'apellido' => 'Méndez',   'pais' => 'México',    'mp_sub' => 'SUB-009-MP', 'mp_email' => 'pablo.mp@gmail.com',    'mp_estado' => 'cancelled'],
            ['username' => 'atleta_ruiz',    'email' => 'ruiz@example.com',     'tipo' => 'atleta',     'estado' => 'registrado', 'nombre' => 'Lucía',     'apellido' => 'Ruiz',     'pais' => 'Argentina', 'mp_sub' => null,          'mp_email' => null,                    'mp_estado' => null],
        ];

        foreach ($usuarios as $data) {
            $usuario = Usuario::firstOrCreate(
                ['username' => $data['username']],
                [
                    'email'    => $data['email'],
                    'password' => Hash::make('password123'),
                    'tipo'     => $data['tipo'],
                    'estado'   => $data['estado'],
                ]
            );

            Perfil::firstOrCreate(
                ['usuario_id' => $usuario->id],
                [
                    'nombre'   => $data['nombre'],
                    'apellido' => $data['apellido'],
                    'pais'     => $data['pais'],
                ]
            );

            if ($data['mp_sub']) {
                Suscripcion::firstOrCreate(
                    ['usuario_id' => $usuario->id],
                    [
                        'mp_subscription_id' => $data['mp_sub'],
                        'mp_payer_email'     => $data['mp_email'],
                        'mp_estado'          => $data['mp_estado'],
                    ]
                );
            }
        }
    }
}
