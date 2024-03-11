/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import ChatListItem from '../chat-list-item/chat-list-item';
import styles from './chst-list.module.scss';
import getLocalStorage from '../../hooks/local-storage';
import { IUser } from '../../services/types/types';

const ChatList = (): JSX.Element => {
  const [chatData, setChatdata] = useState<IUser | null | undefined>();

  useEffect(() => {
    const data: IUser | undefined | null = getLocalStorage('user');
    setChatdata(data);
  }, []);

  const chatItems = chatData?.chatListData ?? [];

  return (
  <div className={styles.container}>
    <TextField id="outlined-basic" label="Search" variant="filled" color="success" sx={{ width: 350 }}/>
    <div className={styles.list}>
    {chatItems?.map((chat, index) => (
        <ChatListItem
          key={index}
          avatar={chat.userAvatar}
          name={chat.userName}
          lastMess={chat?.lastMess ? chat?.lastMess : 'alskdjb KBBBOI aodshb OBoiad '}
        />
    ))}
    </div>
  </div>
  );
};

export default ChatList;
