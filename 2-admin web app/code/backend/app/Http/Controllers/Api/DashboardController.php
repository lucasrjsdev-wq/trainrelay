<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use App\Models\Suscripcion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function resumenUsuarios(Request $request)
    {
        $query = Usuario::whereIn('tipo', ['entrenador', 'atleta']);

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }
        if ($request->filled('desde')) {
            $query->whereDate('created_at', '>=', $request->desde);
        }
        if ($request->filled('hasta')) {
            $query->whereDate('created_at', '<=', $request->hasta);
        }

        $rows = (clone $query)->selectRaw('tipo, estado, count(*) as total')
            ->groupBy('tipo', 'estado')
            ->get();

        $totales = [
            'total'               => 0,
            'entrenadores'        => 0,
            'atletas'             => 0,
            'registrado'          => 0,
            'entrenando'          => 0,
            'suscripto_a_validar' => 0,
            'suscripto'           => 0,
            'sin_suscripcion'     => 0,
            'suspendido'          => 0,
        ];

        $porTipo = [
            'entrenador' => ['registrado' => 0, 'suscripto_a_validar' => 0, 'suscripto' => 0, 'sin_suscripcion' => 0],
            'atleta'     => ['registrado' => 0, 'entrenando' => 0],
        ];

        foreach ($rows as $row) {
            $totales['total'] += $row->total;
            $totales[$row->tipo === 'entrenador' ? 'entrenadores' : 'atletas'] += $row->total;
            if (array_key_exists($row->estado, $totales)) {
                $totales[$row->estado] += $row->total;
            }
            if (isset($porTipo[$row->tipo]) && array_key_exists($row->estado, $porTipo[$row->tipo])) {
                $porTipo[$row->tipo][$row->estado] = $row->total;
            }
        }

        return response()->json(compact('totales', 'porTipo'));
    }

    public function registrosPorMes(Request $request)
    {
        $query = Usuario::whereIn('tipo', ['entrenador', 'atleta'])
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as mes, tipo, count(*) as total")
            ->groupBy('mes', 'tipo')
            ->orderBy('mes');

        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }
        if ($request->filled('desde')) {
            $query->whereDate('created_at', '>=', $request->desde);
        }
        if ($request->filled('hasta')) {
            $query->whereDate('created_at', '<=', $request->hasta);
        }

        $rows = $query->get();

        $meses = $rows->pluck('mes')->unique()->sort()->values();
        $series = [
            'entrenadores' => [],
            'atletas'      => [],
        ];

        foreach ($meses as $mes) {
            $series['entrenadores'][] = (int) $rows->where('mes', $mes)->where('tipo', 'entrenador')->sum('total');
            $series['atletas'][]      = (int) $rows->where('mes', $mes)->where('tipo', 'atleta')->sum('total');
        }

        return response()->json([
            'meses'  => $meses->values(),
            'series' => $series,
        ]);
    }

    public function usuariosPorPais(Request $request)
    {
        $query = DB::table('usuarios')
            ->join('perfiles', 'usuarios.id', '=', 'perfiles.usuario_id')
            ->whereIn('usuarios.tipo', ['entrenador', 'atleta'])
            ->selectRaw("COALESCE(NULLIF(TRIM(perfiles.pais), ''), 'Sin especificar') as pais, count(*) as total")
            ->groupBy('pais')
            ->orderByDesc('total');

        if ($request->filled('tipo')) {
            $query->where('usuarios.tipo', $request->tipo);
        }
        if ($request->filled('estado')) {
            $query->where('usuarios.estado', $request->estado);
        }
        if ($request->filled('desde')) {
            $query->whereDate('usuarios.created_at', '>=', $request->desde);
        }
        if ($request->filled('hasta')) {
            $query->whereDate('usuarios.created_at', '<=', $request->hasta);
        }

        $rows = $query->get();

        return response()->json([
            'paises' => $rows->pluck('pais'),
            'totales' => $rows->pluck('total'),
        ]);
    }

    public function suscripcionesPorMes(Request $request)
    {
        $query = Suscripcion::join('usuarios', 'suscripciones.usuario_id', '=', 'usuarios.id')
            ->whereIn('usuarios.tipo', ['entrenador', 'atleta'])
            ->selectRaw("DATE_FORMAT(suscripciones.created_at, '%Y-%m') as mes, suscripciones.mp_estado, count(*) as total")
            ->groupBy('mes', 'mp_estado')
            ->orderBy('mes');

        if ($request->filled('tipo')) {
            $query->where('usuarios.tipo', $request->tipo);
        }
        if ($request->filled('desde')) {
            $query->whereDate('suscripciones.created_at', '>=', $request->desde);
        }
        if ($request->filled('hasta')) {
            $query->whereDate('suscripciones.created_at', '<=', $request->hasta);
        }

        $rows = $query->get();

        $meses = $rows->pluck('mes')->unique()->sort()->values();
        $series = [
            'authorized' => [],
            'paused'     => [],
            'cancelled'  => [],
        ];

        foreach ($meses as $mes) {
            foreach (array_keys($series) as $est) {
                $series[$est][] = (int) $rows->where('mes', $mes)->where('mp_estado', $est)->sum('total');
            }
        }

        $totales = [
            'authorized' => Suscripcion::where('mp_estado', 'authorized')->count(),
            'paused'     => Suscripcion::where('mp_estado', 'paused')->count(),
            'cancelled'  => Suscripcion::where('mp_estado', 'cancelled')->count(),
        ];

        return response()->json([
            'meses'   => $meses->values(),
            'series'  => $series,
            'totales' => $totales,
        ]);
    }
}
