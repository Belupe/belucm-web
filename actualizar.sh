#!/usr/bin/env bash
# Actualiza belucm.me desde el repositorio y reinicia el servicio.
set -e
cd /home/nach/belucm-web
echo "==> Bajando cambios"
git pull --ff-only
echo "==> Dependencias"
npm install --no-audit --no-fund
echo "==> Compilando"
npm run build
echo "==> Reiniciando el servicio"
sudo systemctl restart belucm-web
sleep 4
systemctl is-active belucm-web
echo "==> Listo: https://belucm.me"
