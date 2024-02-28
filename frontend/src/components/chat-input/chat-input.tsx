/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './chat-input.module.scss';
import ava from '../../assets/pretty-elf.jpg';
import { addMessage } from '../../lib/features/messages/messages-slice';
import { RootState } from '../../lib/store';

const ChatInput = ():JSX.Element => {
  // получаем аватар пользователя
  const { user } = useSelector((state: RootState) => state.user);
  const avatar = user?.avatar;
  console.log(user);

  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // функция отправки сообщения
  const sendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!inputValue) return;

    const newMessage = {
      _id: Math.random().toString(),
      text: inputValue,
      owner: 'user1',
      isMine: true,
    };

    dispatch(addMessage(newMessage));
    setInputValue('');
  };

  // функция отправки сообщения на enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.box}>
      <Avatar src={avatar} sx={{ width: 70, height: 70 }}/>
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
          <button className={styles.button} type='submit'>Send</button>
      </form>
    </div>
  );
};

export default ChatInput;
