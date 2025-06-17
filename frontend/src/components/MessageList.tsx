'use client';
import styles from '../styles/Chat.module.css';

interface Message {
  from: string;
  decrypted: string;
  timestamp: number;
}

interface Props {
  messages: Message[];
  userId: string;
}

export default function MessageList({ messages, userId }: Props) {
  return (
    <div className={styles.messageList}>
      {messages.map((msg, index) => {
        const isOwn = msg.from === userId;
        const time = new Date(msg.timestamp).toLocaleTimeString();

        return (
          <div
            key={index}
            className={`${styles.messageBubble} ${isOwn ? styles.own : styles.received}`}
          >
            <div className={styles.senderInfo}>
              {isOwn ? 'Tú' : msg.from} — {time}
            </div>
            <div className={styles.messageContent}>{msg.decrypted}</div>
          </div>
        );
      })}
    </div>
  );
}
