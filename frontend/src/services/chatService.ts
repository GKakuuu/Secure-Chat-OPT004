const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
const PEER_ID = process.env.NEXT_PUBLIC_PEER_ID!;
const USER_ID = process.env.NEXT_PUBLIC_USER_ID!;

export async function sendMessage(message: string) {
  const response = await fetch(`${BACKEND_URL}/chat/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: PEER_ID, message }),
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
