/* eslint-disable */
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useParams } from 'react-router-dom';
import { TextField } from '@mui/material';
import ChatListItem from '../chat-list-item/chat-list-item';
import styles from './chst-list.module.scss';
import { IChatListData, IUser } from '../../services/types/types';
import getUserFromCookie from '../../hooks/cookie-parser';
import formatTime from '../../hooks/format-time';
import { AppDispatch, AppThunk } from '../../services/types';
import { useDispatch } from '../../hooks/hooks';
import { getChatList } from '../../lib/features/chat/chat-api';

const ChatList = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const user = getUserFromCookie<IUser>('user');

  const { chatID } = useParams<{ chatID: string }>();
  const [chatData, setChatData] = useState<IChatListData[]>([]);

  const fetchChatData = async () => {
    try {
      const data = await dispatch(getChatList(user?.chats, user?._id) as AppThunk as any);
      setChatData(data);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchChatData(); // Запрашиваем данные, если пользователь есть
    }
  }, []);

  // Сортировка чатов по времени последнего сообщения
  const sortedChatItems = (chatData ?? []).slice().sort((a, b) => {
    return new Date(b.lastMessageCreatedAt).getTime() - new Date(a.lastMessageCreatedAt).getTime();
  });

  return (
    <div className={styles.container}>
      <TextField id="outlined-basic" label="Search" variant="filled" color="success" sx={{ width: 350 }} />
      <div className={styles.list}>
        {sortedChatItems.map((chat) => (
          <Link className={styles.link} to={`/chat/${chat._id}`} key={chat._id}>
            <ChatListItem
              avatar={chat.userAvatar}
              name={chat.userName}
              lastMess={chat.lastMessageText}
              time={formatTime(chat.lastMessageCreatedAt)}
              isActive={chatID === chat._id}
              chatID={chat._id}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
