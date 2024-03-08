/* eslint-disable */
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import RegistrationPage from '../../pages/registration-page/registration-page';
import ResetPasswordPage from '../../pages/reset-password/reset-passwod';
import StartPanel from '../start-panel/start-panel';
import Chat from '../chat/chat';
import { useState } from 'react';
import SearchUser from '../search-user/seach-user';

const App = ():JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  // Функция для открытия модального окна при нажатии на аватарку
  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}>
          <Route path='/' element={<StartPanel/>}>
            <Route path='/find/id' element={<SearchUser/>}/>
          </Route>
          <Route path='/chat/:id' element={<Chat/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<RegistrationPage/>}/>
        <Route path='/reset-password' element={<ResetPasswordPage/>}/>
      </Routes>
    </>
  );
};

export default App;
