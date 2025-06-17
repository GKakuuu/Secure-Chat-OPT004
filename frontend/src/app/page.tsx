'use client';

import { useEffect, useState } from 'react';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import { sendMessage, getMessages } from '../services/chatService';
import styles from '../styles/Chat.module.css';

const userId = process.env.NEXT_PUBLIC_USER_ID!;

interface Message {
  from: string;
  decrypted: string;
  timestamp: number;
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const fetched = await getMessages();
      setMessages(fetched);
    } catch (err) {
      console.error('Error al obtener mensajes:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (msg: string) => {
    try {
      await sendMessage(msg);
      // Simular mensaje local con timestamp para mostrarlo de inmediato
      setMessages(prev => [
        ...prev,
        {
          from: userId,
          decrypted: msg,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat Seguro ({userId})</h1>
      <MessageList messages={messages} userId={userId} />
      <MessageForm onSend={handleSend} />
    </div>
  );
}
