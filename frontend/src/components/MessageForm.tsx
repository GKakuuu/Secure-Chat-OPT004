'use client';
import { useState } from 'react';
import styles from '../styles/Chat.module.css';

interface Props {
  onSend: (msg: string) => void;
}

export default function MessageForm({ onSend }: Props) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <form className={styles.messageForm} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button className={styles.sendButton} type="submit">Enviar</button>
    </form>
  );
}
