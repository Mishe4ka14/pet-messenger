/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/home-page/home-page';
import store from './lib/store';
import RegistrationPage from './pages/registration-page/registration-page';
import LoginPage from './pages/login-page/login-page';
import ResetPasswordPage from './pages/reset-password/reset-passwod';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
