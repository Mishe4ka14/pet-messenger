/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/material';
import portret from '../../assets/portret.svg';
import styles from './chat-list-item.module.scss';

  interface Chat {
    avatar: string;
    name: string;
    lastMess: string;
    isActive: boolean;
    time: string,
  }

const ChatListItem = ({
  avatar, name, lastMess, isActive, time,
}: Chat): JSX.Element => {
  return (
    <div className={`${styles.container} ${isActive ? styles.container_active : ''}`}>
      <Avatar src={avatar} sx={{ width: 60, height: 60 }}/>
      <div className={styles.box}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.text}>{lastMess}</p>
      </div>
      <p>{time}</p>
    </div>
  );
};

export default ChatListItem;
