/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/material';
import portret from '../../assets/portret.svg';
import styles from './chat-list-item.module.scss';

const currentTime = new Date().toLocaleTimeString();

const ChatListItem = (): JSX.Element => (
  <div className={styles.container}>
    <Avatar src={portret} sx={{ width: 60, height: 60 }}/>
    <div className={styles.box}>
      <h3 className={styles.name}>Lara Croft</h3>
      <p className={styles.text}>Lorem maiores esse. Repellendus temporibus error numquam sit.</p>
    </div>
    <p>3h</p>
  </div>
);

export default ChatListItem;
