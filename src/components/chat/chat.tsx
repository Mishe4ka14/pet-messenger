/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/material';
import ChatInput from '../chat-input/chat-input';
import styles from './chat.module.scss';
import Message from '../message/message';
import ava from '../../assets/portret.svg';

const Chat = (): JSX.Element => (
  <div className={styles.chat}>
    <div className={styles.profile}>
      <Avatar src={ava} sx={{ width: 60, height: 60 }}/>
      <div className={styles.info}>
        <h2 className={styles.name}>Цирилла Цинтрийская</h2>
        <p className={styles.subtitle}>Принцесса</p>
      </div>
    </div>
      <ul className={`${styles.scroll} custom-scroll`}>
    <div className={`${styles.container}`}>
        <Message isMine={false} />
        <Message isMine={false} />
        <Message isMine={true}/>
    </div>
      </ul>
    <ChatInput/>
  </div>
);

export default Chat;
