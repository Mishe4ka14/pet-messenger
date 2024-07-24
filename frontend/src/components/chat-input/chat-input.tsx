/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar, TextField } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import styles from './chat-input.module.scss';
import { IMessage, IUser } from '../../services/types/types';
import getUserFromCookie from '../../hooks/cookie-parser';

interface Props {
  chatID: string,
  ws: WebSocket | null,
  onNewMessage: (message: IMessage) => void;
}

interface TMess extends IMessage {
  chatID: string
}

const ChatInput = ({ chatID, ws, onNewMessage }: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState('');

  const user = getUserFromCookie<IUser>('user');

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ws) return;
    if (inputValue.trim() === '') return;

    const message: TMess = {
      text: inputValue,
      sender: user?._id,
      createdAt: new Date(),
      chatID,
    };

    ws.send(JSON.stringify(message));
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
      {/* <Avatar src={user?.avatar} sx={{ width: 70, height: 70 }} /> */}
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
