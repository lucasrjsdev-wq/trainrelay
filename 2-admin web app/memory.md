# Memory — TrainRelay Admin Web App

## Proyecto
- Nombre: TrainRelay Admin
- Tipo: Aplicación web responsive (panel de administración para el dueño)
- Stack: Laravel 11 + PHP 8.3 + React + Vite + MySQL 8.4
- Carpeta raíz del proyecto: `2-admin web app/`
- Backend en: `2-admin web app/code/backend/`
- Frontend en: `2-admin web app/code/frontend/`
- Idiomas: Español e Inglés (i18n pendiente de implementar)

## Entorno local (Windows + Laragon)
- PHP 8.3.30: en PATH (via Laragon `C:\laragon\bin\php\php-8.3.30-Win32-vs16-x64\`)
- Composer 2.9.7: en PATH
- Node.js v25.9.0: en PATH
- MySQL 8.4.3: en `C:\laragon\bin\mysql\mysql-8.4.3-winx64\bin\` (agregado al PATH de usuario)
- MySQL credenciales: usuario `root`, contraseña `1234`
- PHP extensión zip: habilitada en `C:\laragon\bin\php\php-8.3.30-Win32-vs16-x64\php.ini`
- PowerShell ExecutionPolicy: RemoteSigned (CurrentUser)

## Base de datos
- Nombre: `trainrelay_admin`
- Tablas creadas: `usuarios`, `perfiles`, `roles`, `permisos`, `personal_access_tokens`, `cache`, `jobs`
- Usuario root sembrado: username=`root`, password=`root` (encriptado bcrypt), tipo=`dueno`, estado=`dueno`

## Usuario y Acceso
- Usuario root inicial: username `root`, contraseña `root` (encriptada en DB con bcrypt)
- Auth via Laravel Sanctum (tokens de API)
- Schema DB: usuarios, perfiles, roles, permisos

## Estados de usuarios

### Atleta
- **Registrado**: estado inicial al registrarse desde la web
- **Entrenando**: el atleta eligió un entrenador en la app 4-Athlete y el entrenador lo aceptó
- Los atletas NO tienen suscripción MercadoPago → campos MP siempre vacíos
- La transición Registrado → Entrenando ocurre en la app 4-Athlete (futura), no desde el admin

### Entrenador
- **registrado**: estado inicial al registrarse desde la web. MP: sin suscripción.
- **suscripto_a_validar**: el entrenador ingresó su ID de suscripción MP y mail de pagador en la app 3-Coach. El sistema debe conectarse al MCP de MercadoPago para validar.
- **suscripto**: validación MP confirmó suscripción "authorized". mp_estado = authorized.
- **sin_suscripcion**: validación MP retornó "paused" o "cancelled". mp_estado = paused/cancelled. También es el estado al que vuelve si la suscripción caduca. Acceso limitado: solo puede ver sus datos de cuenta, sin acceso a otras funcionalidades.

**Flujo de estados entrenador:**
registrado → (ingresa datos MP en app 3-Coach) → suscripto_a_validar → (validación MCP MP) → suscripto (si authorized) o sin_suscripcion (si paused/cancelled)

**Integración MercadoPago API:** implementada en `App\Services\SuscripcionMpService`.
- Endpoint MP: `GET https://api.mercadopago.com/preapproval/{mp_subscription_id}`
- Credenciales TEST en `.env`: `MERCADOPAGO_ACCESS_TOKEN`, `MERCADOPAGO_PUBLIC_KEY`
- ⚠️ Reemplazar por credenciales de producción antes de go-live
- Tarea programada: `php artisan chequear:suscripciones` → diaria a las 00:00 (routes/console.php)
- ⚠️ PENDIENTE PRODUCCIÓN: activar el scheduler en el servidor. En Windows usar Task Scheduler con `php artisan schedule:run` cada minuto. En Linux/cPanel agregar al crontab: `* * * * * php /ruta/al/proyecto/artisan schedule:run >> /dev/null 2>&1`
- Endpoint manual admin: `POST /api/usuarios/{id}/chequear-suscripcion`
- Botón "Chequear estado suscripción" visible solo para entrenadores en la sección MP del detalle

### Dueño
- **Dueño**: solo root, estado nunca cambia
- Puede **suspender** cualquier usuario (entrenador o atleta) desde la página de detalle → estado pasa a `suspendido`, se guarda el estado previo en `estado_previo`
- Puede **rehabilitar** un usuario suspendido → estado vuelve al `estado_previo` (o `registrado` si no hay previo)
- La suspensión es independiente del flujo de estados propio de cada tipo (es una acción manual del dueño)

## Casos de uso definidos (use_cases.md)
1. Panel de administración de usuarios con vista de estados ← ✅ COMPLETADO
2. Lógica de estados de usuario ← PENDIENTE
3. Chequeo automático de suscripción MercadoPago ← PENDIENTE (precio variable, viene de la API de MP)
4. Dashboard con reportes (atletas/entrenadores, ingresos, filtros) ← ✅ COMPLETADO (ingresos con montos pendiente de UC3)
5. Login seguro con usuario/contraseña ← ✅ COMPLETADO

## Lo que quedó listo (2026-05-07)
- ✅ Backend Laravel configurado y corriendo en `http://localhost:8000`
- ✅ Frontend React+Vite corriendo en `http://localhost:5173`
- ✅ Base de datos `trainrelay_admin` creada con todas las tablas
- ✅ Usuario root sembrado con contraseña encriptada
- ✅ Endpoint `POST /api/login` funcionando (devuelve token Sanctum)
- ✅ Endpoint `POST /api/logout` protegido por auth:sanctum
- ✅ CORS configurado para `http://localhost:5173`
- ✅ Página de login en React (`/sign-in`) con formulario usuario/contraseña
- ✅ AuthContext con persistencia en localStorage (`tr_token`, `tr_usuario`)
- ✅ ProtectedRoute — ruta `/` requiere autenticación
- ✅ Servicio API con axios (`src/services/api.js`)

## Lo que quedó listo (2026-05-11)
- ✅ Login universal: redirige a `/` (dueno), `/coming-soon` (entrenador/atleta — actualizar a URL real cuando existan las apps)
- ✅ reCAPTCHA v2 en login: test keys (reemplazar con keys reales antes de producción)
  - Site key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
  - Secret key en `.env`: `RECAPTCHA_SECRET_KEY`
- ✅ Recuperar contraseña: `POST /api/forgot-password` → email con link → `/nueva-contrasena?token=&email=`
- ✅ Reset contraseña: `POST /api/reset-password` → token expira en 60 min
- ✅ Registro de usuario: `POST /api/registrarse` → crea usuario con estado=registrado, envía email para setear contraseña
- ✅ Nuevas rutas frontend: `/recuperar-contrasena`, `/nueva-contrasena`, `/registrarse`
- ✅ Nuevos controllers: `PasswordResetController`, `RegistroController`
- ✅ Email driver: `MAIL_MAILER=log` (dev), emails van a `storage/logs/laravel.log`
- ✅ Vistas Blade: `emails.reset-password`, `emails.set-password`
- ⚠️ Para producción: configurar SMTP real en `.env` (MAIL_MAILER, MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD)

## Lo que quedó listo (2026-05-08)
- ✅ Logout funcional: botón en header llama `authService.logout()`, limpia contexto y redirige a `/sign-in`
- ✅ Sesión persistente: si el usuario ya está logueado y va a `/sign-in`, redirige automáticamente al dashboard
- ✅ Imagen de marca Train Relay en panel izquierdo del login (background-cover)
- ✅ Frontend corre en `http://localhost:5173` (corregido de 5174)
- ✅ Panel de Usuarios (`/panel-usuarios`): tabla con filtros, búsqueda, cambio de estado
- ✅ Tabla `suscripciones` con campos MP: `mp_subscription_id`, `mp_payer_email`, `mp_estado`
- ✅ Modelos: `Perfil`, `Suscripcion` creados; `Usuario` con relaciones `perfil` y `suscripcion`
- ✅ Rutas API protegidas: `GET /api/usuarios`, `PATCH /api/usuarios/{id}/estado`
- ✅ 10 usuarios de prueba sembrados con datos de perfil y suscripción MP

## Próximo paso al retomar
1. Abrir Laragon → Start All (para iniciar MySQL y Apache)
2. Levantar backend: `cd "2-admin web app\code\backend" && php artisan serve --port=8000`
3. Levantar frontend: `cd "2-admin web app\code\frontend" && npm run dev`
4. Probar login en `http://localhost:5173/sign-in` con `root` / `root` (+ CAPTCHA)
5. Para ver emails de reset/registro en dev: revisar `storage/logs/laravel.log` en el backend
6. Continuar con UC2 (lógica de estados) y UC3 (integración MercadoPago)

## Reglas de desarrollo
- Nuevas funcionalidades: primero escribir caso de uso en `use_cases.md`, luego construir
- Pedir logo antes de usarlo
- Pedir imágenes explicando qué se necesita representar
- Levantar app local para revisión conjunta

## Archivos clave creados
- `app/Models/Usuario.php` — Model con HasApiTokens, Notifiable
- `app/Http/Controllers/Api/AuthController.php` — login y logout
- `routes/api.php` — rutas POST /login, POST /logout, GET /me
- `config/cors.php` — CORS configurado para localhost:5173
- `database/migrations/2026_05_07_*` — tablas usuarios, perfiles, roles, permisos
- `database/seeders/UsuarioRootSeeder.php` — root user
- `src/context/AuthContext.jsx` — contexto de auth React
- `src/services/api.js` — instancia axios con interceptor de token
- `src/components/SignInLayer.jsx` — formulario de login adaptado al backend
- `src/components/ProtectedRoute.jsx` — protección de rutas
