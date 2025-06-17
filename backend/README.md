# Secure Chat Backend

Este es el backend de **Secure Chat**, un proyecto académico que implementa comunicación cifrada punto a punto usando NestJS, RSA y AES.

## Descripción

El backend expone una API REST para enviar y recibir mensajes cifrados, gestionar claves públicas/privadas y facilitar la integración con un frontend o con otros peers. Utiliza cifrado híbrido: los mensajes se cifran con AES y la clave AES se cifra con RSA.

## Estructura del proyecto

```
backend/
  ├── src/
  │   ├── chat/
  │   ├── crypto/
  │   ├── messages/
  │   ├── app.module.ts
  │   └── main.ts
  ├── keys/
  ├── generate-keys.ts
  ├── package.json
  ├── .env
  └── ...
```

## Instalación

1. Clona el repositorio y entra a la carpeta `backend`:

   ```bash
   git clone https://github.com/GKakuuu/Secure-Chat-OPT004
   cd backend
   ```

2. Instala las dependencias:

   ```bash
   npm install

   yarn install
   ```

## Variables de entorno

Crea un archivo `.env` en la raíz de `backend/` con el siguiente contenido de ejemplo:

```
USER_ID=user-a
PORT=3000
USER_URL=http://<IP_dispositivo_A>:3000
PEER_URL=http://<IP_dispositivo_B>:3000/chat/receive
KEYS_DIR=./keys
```

- **USER_ID**: Identificador único del usuario (ejemplo: `user-a`, `user-b`).  
- **PORT**: Puerto donde se ejecutará el backend.
- **USER_URL**: URLs permitidas para CORS, separadas por coma si hay varias.
- **PEER_URL**: Endpoint del peer para enviar mensajes (usado en el módulo de chat).
- **KEYS_DIR**: Carpeta donde se almacenan las claves RSA (por defecto `./keys`).

Ambas url deben cambiar el localhost por direcciones IP, siendo la `USER_URL` la del dispositivo en uso y `PEER_URL` la del dispositivo con el que nos queremos comunicar.

## Generación de claves RSA

Antes de iniciar el backend, debes generar las claves RSA para el usuario definido en `USER_ID`:

```bash
npx tsc generate-keys.ts
node .\generate-keys.js
```

Esto creará los archivos `{USER_ID}.private.pem` y `{USER_ID}.public.pem` en la carpeta `keys/`.

## Uso

### Desarrollo

#### NPM

```bash
npm run start:dev
```
#### YARN

```bash
yarn start:dev
```

### Producción

#### NPM

```bash
npm run build
npm run start:prod
```
#### YARN

```bash
yarn build
yarn start:prod
```

### Endpoints principales

- `GET /`  
  Respuesta de prueba: "Hello World!"

- `POST /chat/send`  
  Envía un mensaje cifrado a otro usuario.

- `POST /chat/receive`  
  Recibe y almacena un mensaje cifrado.

- `GET /chat/messages`  
  Obtiene los mensajes recibidos y los descifra.

- `GET /keys/public/:userId`  
  Obtiene la clave pública de un usuario, este solo se ocupa en conjunto con el Frontend

### Documentación Swagger

Accede a la documentación interactiva en:  
[http://localhost:3000/api](http://localhost:3000/api)

## Pruebas

- Unit tests:

  ```bash
  npm run test
  ```

- End-to-end tests:

  ```bash
  npm run test:e2e
  ```

## Notas académicas

- Este proyecto es solo para fines educativos.
- No usar en producción sin una auditoría de seguridad.
