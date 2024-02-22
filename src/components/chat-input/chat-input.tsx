/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar, TextField } from '@mui/material';
import styles from './chat-input.module.scss';
import ava from '../../assets/pretty-elf.jpg';

const ChatInput = ():JSX.Element => (
  <div className={styles.box}>
    <Avatar src={ava} sx={{ width: 70, height: 70 }}/>
    <div className={styles.container}>
      <TextField
      className={styles.input}
            id="standard-textarea"
            placeholder="Type a message"
            multiline
            variant="standard"
            rows={2}
          />
        <button className={styles.button}>Send</button>
      </div>
  </div>
);

export default ChatInput;
