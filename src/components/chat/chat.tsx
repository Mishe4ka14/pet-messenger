/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ChatInput from '../chat-input/chat-input';
import styles from './chat.module.scss';
import Message from '../message/message';
import ava from '../../assets/portret.svg';
import { RootState } from '../../services/reducers/index';
import { IMessage } from '../../services/types/types';

const Chat = (): JSX.Element => {
  const { messages } = useSelector((store: RootState) => store.messages);
  const [chatMessages, setChatMessages] = useState<IMessage[]>(messages);

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  return (
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
      {chatMessages.map((message: IMessage) => (
            <Message
              isMine={message.isMine}
              key={message._id}
              text={typeof message.text === 'string' ? message.text : message.text.exampleKey}
              />))}
      </div>
        </ul>
      <ChatInput/>
    </div>
  );
};

export default Chat;
