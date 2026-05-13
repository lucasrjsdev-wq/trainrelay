#!/bin/sh
set -e

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force --no-interaction
php artisan storage:link --force

exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
