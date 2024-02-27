/* eslint-disable */
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import HomePage from '../../pages/home-page/home-page';
import LoginPage from '../../pages/login-page/login-page';
import RegistrationPage from '../../pages/registration-page/registration-page';
import ResetPasswordPage from '../../pages/reset-password/reset-passwod';
import StartPanel from '../start-panel/start-panel';
import Chat from '../chat/chat';

const App = ():JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}>
          <Route path='/' element={<StartPanel/>}/>
          <Route path='/chat' element={<Chat/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<RegistrationPage/>}/>
        <Route path='/reset-password' element={<ResetPasswordPage/>}/>
      </Routes>
    </>
  );
};

export default App;
