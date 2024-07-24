/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import ChatListItem from '../chat-list-item/chat-list-item';
import styles from './chst-list.module.scss';
import { IUser } from '../../services/types/types';
import getUserFromCookie from '../../hooks/cookie-parser';
import formatTime from '../../hooks/format-time';

const ChatList = (): JSX.Element => {
  const [chatData, setChatdata] = useState<IUser | null | undefined>();
  const activeChatId = useParams();
  const chatItems = chatData?.chatListData ?? [];
  const day = 'day';

  useEffect(() => {
    const user = getUserFromCookie<IUser>('user');
    if (user) {
      setChatdata(user);
    }
  }, []);

  return (
  <div className={styles.container}>
    <TextField id="outlined-basic" label="Search" variant="filled" color="success" sx={{ width: 350 }}/>
    <div className={styles.list}>
    {chatItems?.map((chat, index) => (
      <Link className={styles.link} to={`/chat/${chat._id}`} key={index}>
        <ChatListItem
          key={index}
          avatar={chat.userAvatar}
          name={chat.userName}
          lastMess={chat.lastMessageText}
          time={formatTime(chat.lastMessageCreatedAt)}
          isActive={activeChatId.chatID === chat._id}
        />
      </Link>
    ))}
    </div>
  </div>
  );
};

export default ChatList;
