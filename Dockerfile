FROM node:24-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache libc6-compat

# Habilitar pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias (incluyendo devDependencies)
RUN pnpm install

# Copiar el resto del código
COPY . .


# Copiar script de inicio
COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

# Exponer puerto de desarrollo
EXPOSE 3000

# Comando por defecto (puede ser sobrescrito en docker-compose)
CMD ["sh", "./entrypoint.sh"]