/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './chat-list-item.module.scss';
import { WSS_URL } from '../../utils/api-requests';

interface Chat {
  avatar: string;
  name: string;
  lastMess: string;
  isActive: boolean;
  time: string;
  chatID: string | undefined;
}

const ChatListItem = ({
  avatar, name, lastMess, isActive, time, chatID,
}: Chat): JSX.Element => {
  const [lastMessage, setLastMessage] = useState(lastMess);
  // const [lastMessageTime, setLastMessageTime] = useState(time);

  useEffect(() => {
    // Создаем WebSocket-соединение для этого чата
    // для обновления данных в чате в реальном времени!
    const ws = new WebSocket(`${WSS_URL}/chat/${chatID}`);

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setLastMessage(newMessage.text);
      // setLastMessage(newMessage.time);
    };

    return () => {
      ws.close();
    };
  }, [chatID, lastMess]);

  return (
    <div className={`${styles.container} ${isActive ? styles.container_active : ''}`}>
      <Avatar src={avatar} sx={{ width: 60, height: 60 }} />
      <div className={styles.box}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.text}>{lastMessage}</p>
      </div>
      <p>{time}</p>
    </div>
  );
};

export default ChatListItem;
