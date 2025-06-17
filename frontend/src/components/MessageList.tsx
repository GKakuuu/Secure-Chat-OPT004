'use client';

import styles from './MessageList.module.css';

interface Message {
  from: string;
  decrypted: string;
}

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  return (
    <div className={styles.list}>
      {messages.length === 0 ? (
        <p className={styles.empty}>No hay mensajes aún.</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            <strong>{msg.from}:</strong> {msg.decrypted}
          </div>
        ))
      )}
    </div>
  );
}
