/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/home-page/home-page';
import store from './lib/store';
import RegistrationPage from './pages/registration-page/registration-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <HomePage/> */}
      <RegistrationPage/>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
