'use client';

import { useEffect, useState } from 'react';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import { sendMessage, getMessages } from '../services/chatService';
import styles from './page.module.css';

const userId = process.env.NEXT_PUBLIC_USER_ID!;

export default function HomePage() {
  const [messages, setMessages] = useState<{ from: string; decrypted: string }[]>([]);

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error('Error al obtener mensajes:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (message: string) => {
    try {
      await sendMessage(message);
      fetchMessages();
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat seguro ({userId})</h1>
      <MessageForm onSend={handleSend} />
      <MessageList messages={messages} />
    </div>
  );
}
