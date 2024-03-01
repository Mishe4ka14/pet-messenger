/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AppHeader from '../../components/app-header/app-header';
import ChatList from '../../components/chat-list/chat-list';
import StartPanel from '../../components/start-panel/start-panel';
import Chat from '../../components/chat/chat';
import styles from './home-page.module.scss';
import { RootState } from '../../lib/store';
import Modal from '../../components/modal/modal';
import Profile from '../../components/profile/profile';

const HomePage = ():JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Функция для открытия попапа с профилем пользователя
  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };
  return (
      <div className={styles.app}>
        <AppHeader onAvatarClick={handleAvatarClick}/>
        <main className={styles.main}>
          <ChatList/>
          <Outlet/>
        </main>
        {isModalOpen ? (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Profile />
        </Modal>) : null}
      </div>
  );
};

export default HomePage;
