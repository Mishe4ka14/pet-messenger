/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import styles from './message.module.scss';

interface MessageProps {
  isMine: boolean;
  text: string,
  time: string,
}

const Message: React.FC<MessageProps> = ({ isMine, text, time }) => {
  const [isRead, setIsRead] = useState(true);

  const handleRead = () => {
    setIsRead(true);
  };

  return (
    <div className={`${styles.message} ${isMine ? styles.mine : styles.theirs}`}>
      <p className={styles.text}>{text} </p>
      <div className={styles.data}>
        <p className={styles.time}>{time}</p>
        <div className={styles.status}>{isRead ? '✓✓' : '✓'}</div>
      </div>
    </div>
  );
};

export default Message;
