/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { TextField } from '@mui/material';
import ChatListItem from '../chat-list-item/chat-list-item';
import styles from './chst-list.module.scss';

const ChatList = (): JSX.Element => (
  <div className={styles.container}>
    <TextField id="outlined-basic" label="Search" variant="filled" color="success" sx={{ width: 350 }}/>
    <div className={styles.list}>
      <ChatListItem/>
      <ChatListItem/>
      <ChatListItem/>
    </div>
  </div>
);

export default ChatList;
