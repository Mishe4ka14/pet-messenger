/* eslint-disable */
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from '../../hooks/hooks';
import ChatInput from '../chat-input/chat-input';
import styles from './chat.module.scss';
import Message from '../message/message';
import {
  IChatAndUserResponse, IMessage, IUser, TUser,
} from '../../services/types/types';
import { getChat } from '../../lib/features/chat/chat-api';
import getLocalStorage from '../../hooks/local-storage';

const Chat = (): JSX.Element => {
  const dispatch = useDispatch();
  const [chatMessages, setChatMessages] = useState<IMessage[]>([]);
  const [foundUser, setFoundUser] = useState<TUser | null>(null);
  const { chatID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (chatID) {
        try {
          localStorage.removeItem('foundUser');
          const data = await dispatch(getChat(chatID)) as unknown as IChatAndUserResponse;

          // Получаем второго пользователя для загрузки информации
          const user: IUser | null = getLocalStorage('foundUser');
          setFoundUser(user ?? null);
          setChatMessages(data.chat.messages);
        } catch (error) {
          console.error(error);
          alert('Произошла ошибка при создании чата');
        }
      }
    };

    fetchData();
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
        <ul className={`${styles.scroll} custom-scroll`}>
      <div className={`${styles.container}`}>
      {chatMessages.map((message: IMessage) => (
            <Message
              isMine={message.isMine}
              key={message._id}
              text={typeof message.text === 'string' ? message.text : message.text.exampleKey}
              />))}
      </div>
        </ul>
      <ChatInput dispatch={dispatch}/>
    </div>
  );
};

export default Chat;
