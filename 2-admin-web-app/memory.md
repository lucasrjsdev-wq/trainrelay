# Memory — TrainRelay Admin Web App
_Última actualización: 2026-05-11_

---

## Proyecto
- **Nombre:** TrainRelay Admin — panel de administración para el dueño
- **Stack:** Laravel 11 + PHP 8.3 + React + Vite + MySQL 8.4
- **Backend:** `2-admin web app/code/backend/` → `http://localhost:8000`
- **Frontend:** `2-admin web app/code/frontend/` → `http://localhost:5173`
- **Repo GitHub:** `https://github.com/lucasrjsdev-wq/trainrelay`

---

## Entorno local (Windows + Laragon)
- PHP 8.3.30, Composer 2.9.7, Node.js v25.9.0 en PATH
- MySQL 8.4.3 en `C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\` — credenciales: `root` / `1234`
- PowerShell ExecutionPolicy: RemoteSigned (CurrentUser)

## Para levantar el entorno
```
1. Laragon → Start All
2. cd "2-admin web app\code\backend" && php artisan serve --port=8000
3. cd "2-admin web app\code\frontend" && npm run dev
4. Login: http://localhost:5173/sign-in  →  root / root  (+ tildar CAPTCHA)
```
- Emails en desarrollo → `storage/logs/laravel.log` (MAIL_MAILER=log)

---

## Base de datos: `trainrelay_admin`
Tablas: `usuarios`, `perfiles`, `suscripciones`, `roles`, `permisos`, `personal_access_tokens`, `cache`, `jobs`, `password_reset_tokens`

**Campos de `perfiles`:** nombre, apellido, documento, telefono, ciudad, pais, foto
**Campos de `suscripciones`:** mp_subscription_id, mp_payer_email, mp_estado
**Campos extra en `usuarios`:** estado_previo (para suspension/rehabilitacion)

Usuario root: username=`root`, password=`root` (bcrypt), tipo=`dueno`, estado=`dueno`

---

## Estados de usuarios

### Atleta
| Estado | Descripción |
|---|---|
| `registrado` | Estado inicial al registrarse |
| `entrenando` | Eligió entrenador en app 4-Athlete y fue aceptado |
| `suspendido` | Suspendido manualmente por el dueño |
- **Sin suscripción MP** — campos MP siempre vacíos
- Transición `registrado → entrenando` ocurre en app 4-Athlete (futura)

### Entrenador
| Estado | Descripción |
|---|---|
| `registrado` | Estado inicial al registrarse |
| `suscripto_a_validar` | Ingresó datos MP en app 3-Coach, pendiente validación |
| `suscripto` | MP confirmó suscripción `authorized` |
| `sin_suscripcion` | MP retornó `paused`/`cancelled`. Acceso limitado: solo sus datos de cuenta |
| `suspendido` | Suspendido manualmente por el dueño |
- Flujo: `registrado → suscripto_a_validar → suscripto / sin_suscripcion`
- Ingreso de datos MP ocurre en app 3-Coach (futura)

### Dueño
- Estado `dueno`, nunca cambia
- Puede **suspender** cualquier usuario → guarda estado previo en `estado_previo`
- Puede **rehabilitar** → restaura `estado_previo` (o `registrado` si no hay)

---

## Funcionalidades implementadas

### Autenticación
- Login universal con reCAPTCHA v2 (test keys en dev, producción requiere keys reales)
- Redirección post-login por tipo: `dueno→/`, `entrenador/atleta→/coming-soon` (actualizar con URL real)
- Recuperar contraseña: link por email con token de 60 min → `/nueva-contrasena?token=&email=`
- Registro: nombre, apellido, email, username, tipo → estado=`registrado`, email para setear contraseña
- reCAPTCHA: validación backend solo en `APP_ENV != local`

### Panel de Usuarios (`/panel-usuarios`)
- Tabla paginada con filtros por tipo, estado y búsqueda
- Badge de estado por color según tipo de usuario
- Nombre clickeable → detalle del usuario
- Dropdown de cambio de estado (muestra solo estados válidos para el tipo)

### Detalle de Usuario (`/usuarios/:id`)
- **Foto de perfil:** upload JPG/PNG/WEBP hasta 2 MB → `storage/app/public/fotos-perfil/`
- **Datos personales:** nombre, apellido, documento, teléfono, ciudad, país
- **Datos de cuenta:** username, email, tipo, estado (bloqueado si suspendido)
- **Suscripción MP:** visible solo para entrenadores. Incluye botón "Chequear estado suscripción"
- **Switch suspender/rehabilitar:** en el encabezado de la página

### Dashboard (`/`)
- Filtros: tipo, estado, rango de fechas
- Tab **Usuarios:** stat cards, donut por estado, barras registros mensuales, pie por país, detalle por tipo
- Tab **Ingresos MP:** suscripciones por estado y por mes

### Integración MercadoPago
- Servicio: `App\Services\SuscripcionMpService`
- Endpoint: `GET https://api.mercadopago.com/preapproval/{mp_subscription_id}`
- Resultado: `authorized→suscripto`, `paused/cancelled→sin_suscripcion`
- Si el usuario está suspendido: solo actualiza `mp_estado`, no cambia el estado del usuario
- Tarea programada diaria 00:00: `php artisan chequear:suscripciones` (routes/console.php)
- Endpoint manual: `POST /api/usuarios/{id}/chequear-suscripcion`

---

## Credenciales (solo dev — NO commitear)
- reCAPTCHA test site key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- MP Public Key TEST: `TEST-5ace8f65-9efd-4e17-b320-ff59f203e85d`
- MP Access Token TEST: `TEST-4466233636666657-051114-5e0f10dfe6ba05e96446451bd1672b60-139036914`

---

## Pendientes para producción
- [ ] Reemplazar test keys reCAPTCHA por keys reales de `trainrelay.com`
- [ ] Configurar SMTP real en `.env` (MAIL_MAILER, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD)
- [ ] Reemplazar credenciales MP TEST por producción
- [ ] Activar scheduler: en Linux/cPanel → `* * * * * php /ruta/artisan schedule:run >> /dev/null 2>&1`
- [ ] Actualizar URLs de redirección post-login para entrenador y atleta
- [ ] Implementar lógica de estados en app 3-Coach y 4-Athlete

## Pendientes de desarrollo (próximas sesiones)
- UC2: Lógica de validación de acceso según estado (entrenador `sin_suscripcion` → acceso limitado)
- UC3: Integración completa MP con montos reales en dashboard de ingresos
- App 3-Coach: ingreso de datos MP, selección y aceptación de atletas
- App 4-Athlete: selección de entrenador

---

## Reglas de desarrollo
- Nuevas funcionalidades: escribir caso de uso en `use_cases.md` antes de construir
- Pedir logo e imágenes antes de usarlos
- Levantar app local para revisión conjunta antes de dar por completado
