<?php

use Illuminate\Support\Facades\Schedule;

// Chequeo diario de suscripciones MP de entrenadores — todos los días a las 00:00
Schedule::command('chequear:suscripciones')->dailyAt('00:00');
