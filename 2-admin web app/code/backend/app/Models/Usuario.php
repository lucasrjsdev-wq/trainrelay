<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'usuarios';

    protected $fillable = [
        'username',
        'email',
        'password',
        'tipo',
        'estado',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function perfil()
    {
        return $this->hasOne(Perfil::class, 'usuario_id');
    }

    public function suscripcion()
    {
        return $this->hasOne(Suscripcion::class, 'usuario_id');
    }
}
