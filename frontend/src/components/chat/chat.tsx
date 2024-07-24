/* eslint-disable */
/* eslint-disable no-unused-vars */
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from '../../hooks/hooks';
import ChatInput from '../chat-input/chat-input';
import styles from './chat.module.scss';
import Message from '../message/message';
import {
  IChatAndUserResponse, IMessage, IUser, TUser,
} from '../../services/types/types';
import { getChat } from '../../lib/features/chat/chat-api';
import Cookies from 'js-cookie';
import getUserFromCookie from '../../hooks/cookie-parser';
import formatTime from '../../hooks/format-time';
import { WSS_URL } from '../../utils/api-requests';

const Chat = (): JSX.Element => {
  const dispatch = useDispatch();
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [foundUser, setFoundUser] = useState<TUser | null>(null);
  const { chatID } = useParams();
  const user = getUserFromCookie<TUser>('user');
  const wsRef = useRef<WebSocket | null>(null);

  const handleNewMessage = (message: IMessage) => {
    // Обработка нового сообщения и его добавление в список сообщений чата
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  //получаем сообщения чата по ChatID
  useEffect(() => {
    const fetchData = async () => {
      if (chatID) {
        try {
          Cookies.remove('foundUser');
          const data = await dispatch(getChat(chatID, user?._id)) as unknown as IChatAndUserResponse;

          // Получаем второго пользователя для загрузки информации
          const secondUser = getUserFromCookie<TUser>('foundUser');
          setFoundUser(secondUser ?? null);
          setChatMessages(data.chat.messages);
        } catch (error) {
          console.error(error);
          alert('Произошла ошибка при создании чата');
        }
      }
    };

    fetchData();
  }, [chatID]);

  useEffect(() => {
    const ws = new WebSocket(`${WSS_URL}/chat/${chatID}`);
    wsRef.current = ws;

    ws.addEventListener('open', () => {
      console.log('WebSocket connection established');
    });

    ws.addEventListener('message', (event) => {
      const newMessage = JSON.parse(event.data);
      handleNewMessage(newMessage);
    });

    // Очищаем обработчик события при размонтировании компонента
    return () => {
      ws.close();
    };
  }, [chatID]);

  return (
    <div className={styles.chat}>
      <div className={styles.profile}>
        <Avatar src={foundUser?.avatar} sx={{ width: 70, height: 70 }}/>
        <div className={styles.info}>
          <h2 className={styles.name}>{foundUser?.name}</h2>
          <p className={styles.about}>{foundUser?.about}</p>
        </div>
      </div>
      <div className={styles.chat_and_chatInput}>
        <ul className={`${styles.scroll} custom-scroll`}>
          <div className={`${styles.container}`}>
          {chatMessages.map((message: IMessage, index) => (
            <Message
                  isMine={message.sender === user?._id}
                  key={index}
                  text={typeof message.text === 'string' ? message.text : message.text.exampleKey}
                  time={formatTime(message.createdAt)}
                  />))}
          </div>
        </ul>
        { chatID && <ChatInput chatID={chatID} ws={wsRef.current} onNewMessage={handleNewMessage}/>}
      </div>
    </div>
  );
};

export default Chat;
