# Memory — TrainRelay Coach Web App
_Última actualización: 2026-05-14_

---

## Proyecto
- **Nombre:** TrainRelay Coach — app para entrenadores
- **Stack:** React + Vite (frontend) — Backend compartido con 2-admin-web-app (Laravel 11 + PHP 8.3)
- **Frontend:** `3-coach-web-app/code/frontend/` → `http://localhost:5174`
- **Backend:** compartido en `2-admin-web-app/code/backend/` → `http://localhost:8000`
- **DB:** `trainrelay_admin` (misma base que admin app)

---

## Arquitectura de autenticación
- El entrenador se loguea en **2-admin-web-app** (`admin.trainrelay.com/sign-in`)
- Si `tipo === "entrenador"`, admin redirige a `coach.trainrelay.com/auth?token=<TOKEN>`
- Coach app lee el token de la URL, lo guarda como `tr_coach_token` en localStorage
- No hay pantalla de login propia en el coach app

---

## Variables de entorno (frontend)
- `VITE_API_URL` → URL del backend compartido (e.g. `http://localhost:8000/api`)

## Variables de entorno (admin — a agregar)
- `VITE_COACH_APP_URL` → URL del coach app (e.g. `http://localhost:5174`)

---

## Estados de acceso del entrenador
| Estado | Acceso |
|---|---|
| `registrado` | Solo pantalla "Completar Perfil" |
| `suscripto_a_validar` | Perfil + mensaje validación pendiente |
| `suscripto` | Acceso completo |
| `sin_suscripcion` | Solo perfil con aviso |
| `suspendido` | Acceso denegado |

---

## Funcionalidades implementadas
_(vacío — en construcción)_

---

## Pendientes de desarrollo
- UC1: Autenticación via admin app + ruta /auth
- UC2: Completar Perfil (datos personales + contraseña + MP)
- UC3: Dashboard de pendientes y cumplimiento
- UC4: Sección de atletas (nuevos / actuales / grupos)
- UC5: Banco de rutinas (genéricas + personalizadas)

---

## Reglas de desarrollo
- Escribir el caso de uso en `use_cases_coach.md` antes de construir cada funcionalidad
- Bilingüe: español e inglés
- Responsive
- Pedir logo e imágenes antes de usarlos
- Levantar app local para revisión conjunta antes de dar por completado
