<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 560px; margin: 40px auto; background: #fff; border-radius: 8px; padding: 40px; }
        .logo { font-size: 22px; font-weight: bold; color: #4e45e5; margin-bottom: 24px; }
        h2 { color: #1a1a2e; margin-bottom: 12px; }
        p { color: #555; line-height: 1.6; }
        .btn { display: inline-block; margin: 24px 0; padding: 14px 28px; background: #4e45e5; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; }
        .footer { margin-top: 32px; font-size: 12px; color: #aaa; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">TrainRelay</div>
        <h2>¡Bienvenido/a a TrainRelay!</h2>
        <p>Hola {{ $usuario->perfil->nombre ?? $usuario->username }},</p>
        <p>Tu usuario fue creado exitosamente. Para completar el registro, necesitás configurar tu contraseña haciendo clic en el siguiente botón:</p>
        <a href="{{ $setPasswordUrl }}" class="btn">Configurar contraseña</a>
        <p>Este enlace es válido por <strong>60 minutos</strong>. En breve nos comunicaremos con vos para definir el acceso a la plataforma.</p>
        <div class="footer">
            TrainRelay &mdash; Todos los derechos reservados
        </div>
    </div>
</body>
</html>
