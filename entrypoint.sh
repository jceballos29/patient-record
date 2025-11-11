#! /bin/sh

set -e

echo "🟢 Esperando a que la base de datos esté disponible..."
until nc -z postgres 5432; do
  sleep 1
done

echo "✅ Base de datos disponible."

echo "🧩 Verificando migraciones..."
if pnpm prisma migrate status | grep -q "Database schema is up to date"; then
  echo "✅ No hay migraciones pendientes."
else
  echo "🚀 Aplicando migraciones..."
  pnpm prisma migrate deploy || pnpm prisma migrate dev --name init
fi

echo "🚀 Iniciando aplicación Next.js en modo desarrollo..."
exec pnpm dev