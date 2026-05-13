#!/bin/sh
set -e

if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force --no-interaction
php artisan db:seed --class=UsuarioRootSeeder --force --no-interaction
php artisan storage:link --force

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
