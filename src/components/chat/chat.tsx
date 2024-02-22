/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import ChatInput from '../chat-input/chat-input';
import styles from './chat.module.scss';
import ChatListItem from '../chat-list-item/chat-list-item';

const Chat = (): JSX.Element => (
  <div className={styles.chat}>
    <ChatInput/>
  </div>
);

export default Chat;
