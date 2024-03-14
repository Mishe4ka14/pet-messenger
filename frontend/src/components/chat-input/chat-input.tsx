/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar, TextField } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import styles from './chat-input.module.scss';
import { IMessage, IUser } from '../../services/types/types';
import { WSS_URL } from '../../utils/api-requests';
import getUserFromCookie from '../../hooks/cookie-parser';

interface Props {
  chatID: string,
  onNewMessage: (message: IMessage) => void;
}

interface TMess extends IMessage {
  chatID: string
}

const ChatInput = ({ chatID, onNewMessage }: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState('');

  const user = getUserFromCookie<IUser>('user');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WSS_URL}/chat/${chatID}`);
    wsRef.current = ws;

    ws.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    // Убедитесь, что обработчик события message добавляется каждый раз при монтировании компонента
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log('WebSocket connection closed');
      }
    };
  }, [chatID]);

  // Добавляем обработчик события message при каждом монтировании компонента
  useEffect(() => {
    if (!wsRef.current) return () => {};

    const handleMessage = (event: MessageEvent) => {
      console.log('Received message:', event.data);
      const newMessage = JSON.parse(event.data);
      // Обновляем состояние чата, чтобы отобразить новое сообщение
      onNewMessage(newMessage);
    };

    wsRef.current.addEventListener('message', handleMessage);

    // Очищаем обработчик события при размонтировании компонента
    return () => {
      if (wsRef.current) {
        wsRef.current.removeEventListener('message', handleMessage);
      }
    };
  }, []);

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!wsRef.current) return;
    if (inputValue.trim() === '') return;

    const message: TMess = {
      text: inputValue,
      sender: user?._id,
      createdAt: new Date(),
      chatID,
    };

    wsRef.current.send(JSON.stringify(message));
    setInputValue('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // функция отправки сообщения на enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage(event);
    }
  };

  return (
    <div className={styles.box}>
      <Avatar src={user?.avatar} sx={{ width: 70, height: 70 }} />
      <form className={styles.container} onSubmit={sendMessage}>
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.input}
          id="standard-textarea"
          placeholder="Type a message"
          multiline
          variant="standard"
          rows={2}
        />
        <button className={styles.button} type="submit">Send</button>
      </form>
    </div>
  );
};
export default ChatInput;
