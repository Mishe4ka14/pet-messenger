/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './chat-input.module.scss';
import ava from '../../assets/pretty-elf.jpg';
import { ADD_MESSAGE, IAddMessageAction, addMessage } from '../../services/actions/messages';

const ChatInput = ():JSX.Element => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMessage = {
      _id: Math.random().toString(),
      text: inputValue,
      owner: 'user1',
      isMine: true,
    };

    e.preventDefault();
    dispatch(addMessage(newMessage));
    setInputValue('');
  };

  return (
    <div className={styles.box}>
      <Avatar src={ava} sx={{ width: 70, height: 70 }}/>
      <form className={styles.container} onClick={sendMessage}>
        <TextField
        value={inputValue}
        onChange={handleInputChange}
        className={styles.input}
              id="standard-textarea"
              placeholder="Type a message"
              multiline
              variant="standard"
              rows={2}
            />
          <button className={styles.button}>Send</button>
      </form>
    </div>
  );
};

export default ChatInput;
