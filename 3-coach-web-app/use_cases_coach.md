1- La aplicación debe tener un acceso seguro con usuario y contraseña y para ello debe reutilizar el login de la aplicación "2-admin-web-app", que al detectar que el usuario que se loguea es un entrenador, debe continuar con esta aplicación.

2- La aplicación debe contar con una funcionalidad que permita completar todos los datos del usuario (el propio entrenador). Esta pantalla será cargada luego de que un usuario no registrado, se registra con sus datos y se define como entrenador. Esta pantalla permite completar todos los datos necesarios del usuario entrenador y además ofrece en la misma el boton de suscrpción a MercadoPago. Dentro de los datos que completa tambien está el dato de su contraseña de acceso.

3- Una vez que el entrenador se ha registrado, puede ingresar a la aplicación.

4- Un usuario entrenador siempre podrá ingresar a la aplicación y visaulizar sus datos de perfil.

5- Un usuario entrenador que tenga su suscrpción vigente podrá ver un panel de control (dashboard de pendientes y cumplimiento), una sección de atletas (en donde puede ver atletas nuevos o atletas actuales y grupos), un banco de rutinas a utilizar (genericas que vienen por default y personalizadas generadas por el entrenador). 

---

## UC1 — Autenticación via Admin App
**Estado:** En desarrollo

### Descripción
El entrenador se autentica a través del login de 2-admin-web-app. Al detectar que el tipo de usuario es `entrenador`, el admin app redirige al coach app pasando el token de autenticación como parámetro en la URL.

### Flujo
1. El entrenador ingresa sus credenciales en `admin.trainrelay.com/sign-in`
2. El backend valida y retorna `{ token, usuario: { tipo: "entrenador", ... } }`
3. El admin app detecta `tipo === "entrenador"` y redirige a `coach.trainrelay.com/auth?token=<TOKEN>`
4. El coach app recibe el token, lo almacena en `localStorage` como `tr_coach_token` y redirige al inicio
5. Si el entrenador ya está autenticado, omite el paso 3 y va directo al inicio

### Estados de acceso
| Estado del entrenador | Acceso |
|---|---|
| `registrado` | Solo pantalla "Completar Perfil" |
| `suscripto_a_validar` | Perfil + mensaje de validación pendiente |
| `suscripto` | Acceso completo (dashboard, atletas, rutinas) |
| `sin_suscripcion` | Solo perfil con aviso de suscripción vencida |
| `suspendido` | Acceso denegado |

### Cambios en 2-admin-web-app
- `SignInLayer.jsx`: si `tipo === "entrenador"`, redirigir a `${VITE_COACH_APP_URL}/auth?token=${token}`

### Cambios en 3-coach-web-app
- Ruta `/auth`: lee `?token` de la URL, guarda en localStorage, redirige a `/`
- `AuthContext`: gestiona estado del entrenador autenticado
- `ProtectedRoute`: valida token y estado del entrenador

---

## UC2 — Completar Perfil del Entrenador
**Estado:** Pendiente

### Descripción
Luego de que un nuevo entrenador se registra en el sistema (desde 2-admin-web-app), al ingresar por primera vez al coach app, se le presenta la pantalla de completar perfil. Esta pantalla le permite ingresar todos sus datos personales y configurar su contraseña de acceso. También incluye el botón de suscripción a MercadoPago.

### Flujo
1. Entrenador ingresa al coach app con estado `registrado`
2. El sistema detecta el estado y redirige automáticamente a `/completar-perfil`
3. El entrenador completa: nombre, apellido, documento, teléfono, ciudad, país, contraseña
4. Al presionar el botón de suscripción MP, se inicia el flujo de suscripción
5. Al confirmar suscripción, el estado cambia a `suscripto_a_validar`
6. El admin app valida y cambia a `suscripto`

### Campos del formulario
- Nombre, Apellido, Documento, Teléfono, Ciudad, País
- Nueva contraseña + Confirmación de contraseña
- Botón "Suscribirse con MercadoPago"
