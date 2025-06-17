# Secure Chat Frontend

Este es el frontend de **Secure Chat**, un proyecto académico de mensajería cifrada punto a punto. Está construido con Next.js y TypeScript, y se comunica con el backend para enviar y recibir mensajes cifrados.

## Descripción

La aplicación permite a dos usuarios intercambiar mensajes de manera segura. El frontend se encarga de la interfaz de usuario y de interactuar con el backend para el envío y la recepción de mensajes cifrados, así como la obtención de claves públicas.

## Estructura del proyecto

```
frontend/
  ├── src/
  │   ├── app/
  │   │   ├── layout.tsx
  │   │   ├── page.tsx
  │   │   └── globals.css
  │   ├── components/
  │   │   ├── MessageForm.tsx
  │   │   └── MessageList.tsx
  │   ├── services/
  │   │   └── chatService.ts
  │   └── styles/
  │       └── Chat.module.css
  ├── public/
  ├── .env.local
  ├── package.json
  ├── tsconfig.json
  └── ...
```

## Instalación

1. Clona el repositorio y entra a la carpeta `frontend`:

   ```bash
   git clone https://github.com/GKakuuu/Secure-Chat-OPT004
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   yarn install
   ```

## Variables de entorno (`.env.local`)

Debes crear un archivo `.env.local` en la raíz del frontend con las siguientes variables:

```
NEXT_PUBLIC_BACKEND_URL=http://<IP_dispositivo_A>:3000
NEXT_PUBLIC_USER_ID=user-a
NEXT_PUBLIC_PEER_ID=user-b
NEXT_PUBLIC_PEER_BACKEND_URL=http://<IP_dispositivo_B>:3000
```

- **NEXT_PUBLIC_BACKEND_URL**: URL del backend propio (por ejemplo, `http://localhost:3000`).
- **NEXT_PUBLIC_USER_ID**: ID del usuario actual (debe coincidir con el `USER_ID` del backend propio).
- **NEXT_PUBLIC_PEER_ID**: ID del usuario peer (el destinatario de los mensajes).
- **NEXT_PUBLIC_PEER_BACKEND_URL**: URL del backend del peer.

> **Nota:** Todas las variables que empiezan con `NEXT_PUBLIC_` estarán disponibles en el navegador y en el código del frontend.

## Uso

### Desarrollo

#### NPM

```bash
npm run dev
```

#### YARN

```bash
yarn dev
```

La aplicación estará disponible en [http://localhost:3001](http://localhost:3001) (o el puerto que indique Next.js).

### Producción

```bash
npm run build
npm start
```

## Funcionalidades principales

- **Enviar mensajes:**  
  Escribe un mensaje y envíalo. El mensaje se cifra y se envía al backend, que lo reenvía al peer.

- **Recibir mensajes:**  
  Los mensajes recibidos se muestran en tiempo real (con polling cada 5 segundos).

- **Visualización:**  
  Los mensajes enviados y recibidos se muestran diferenciados por color y alineación.

## Componentes principales

- **`MessageForm`**: Formulario para escribir y enviar mensajes.
- **`MessageList`**: Lista de mensajes, mostrando remitente, hora y contenido descifrado.

## Servicios

- **`chatService.ts`**:  
  Gestiona la comunicación con el backend, incluyendo:
  - Envío de mensajes (`sendMessage`)
  - Obtención de mensajes (`getMessages`)
  - Obtención de claves públicas del peer

## Personalización

Puedes cambiar los IDs y URLs en `.env.local` para probar con diferentes usuarios y backends.

## Notas académicas

- Este frontend es solo para fines educativos.
- No usar en producción sin una revisión de seguridad.
