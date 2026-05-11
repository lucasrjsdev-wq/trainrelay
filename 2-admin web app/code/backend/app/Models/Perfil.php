<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
{
    protected $table = 'perfiles';

    protected $fillable = ['usuario_id', 'nombre', 'apellido', 'documento', 'telefono', 'ciudad', 'pais', 'foto'];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}
