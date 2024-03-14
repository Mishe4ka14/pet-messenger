/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/material';
import portret from '../../assets/portret.svg';
import styles from './chat-list-item.module.scss';

  interface Chat {
    avatar: string;
    name: string;
    lastMess: string;
  }

const ChatListItem = ({ avatar, name, lastMess }: Chat): JSX.Element => (
    <div className={styles.container}>
      <Avatar src={avatar} sx={{ width: 60, height: 60 }}/>
      <div className={styles.box}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.text}>{lastMess}</p>
      </div>
      <p>3h</p>
    </div>
);

export default ChatListItem;
