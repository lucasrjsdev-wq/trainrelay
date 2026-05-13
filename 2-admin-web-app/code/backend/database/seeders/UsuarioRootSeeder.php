<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class UsuarioRootSeeder extends Seeder
{
    public function run(): void
    {
        Usuario::firstOrCreate(
            ['username' => 'root'],
            [
                'email'    => 'root@trainrelay.com',
                'password' => Hash::make('root'),
                'tipo'     => 'dueno',
                'estado'   => 'dueno',
            ]
        );
    }
}
