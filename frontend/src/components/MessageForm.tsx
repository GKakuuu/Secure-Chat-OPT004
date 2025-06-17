'use client';

import { useState } from 'react';
import styles from './MessageForm.module.css';

interface Props {
  onSend: (message: string) => void;
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Enviar</button>
    </form>
  );
}
