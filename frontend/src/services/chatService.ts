const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
const PEER_ID = process.env.NEXT_PUBLIC_PEER_ID!;
const USER_ID = process.env.NEXT_PUBLIC_USER_ID!;
const PEER_BACKEND_URL = process.env.NEXT_PUBLIC_PEER_BACKEND_URL!;

const publicKeyCache: Record<string, string> = {};

async function getPublicKey(userId: string): Promise<string> {
  if (publicKeyCache[userId]) {
    return publicKeyCache[userId];
  }

  const response = await fetch(`${PEER_BACKEND_URL}/keys/public/${userId}`);
  if (!response.ok) {
    throw new Error(`No se pudo obtener la clave pública de ${userId}`);
  }

  const data = await response.json();
  const publicKey = data.publicKey;

  publicKeyCache[userId] = publicKey;
  return publicKey;
}

export async function sendMessage(message: string) {
  // Obtener (o usar cache) la clave pública del peer
  const peerPublicKey = await getPublicKey(PEER_ID);

  const response = await fetch(`${BACKEND_URL}/chat/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: PEER_ID,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error('Error al enviar mensaje');
  }

  return response.json();
}

export async function getMessages() {
  const response = await fetch(`${BACKEND_URL}/chat/messages?userId=${USER_ID}`);
  if (!response.ok) {
    throw new Error('Error al obtener mensajes');
  }
  return response.json();
}
