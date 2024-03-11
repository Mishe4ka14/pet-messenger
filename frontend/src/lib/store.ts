/* eslint-disable */
/* eslint-disable no-unused-vars */
import { configureStore, Action } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
// import socketMiddleware from './middleware/socket-widdleware';
import { socketMiddleware } from './middleware/socket-widdleware';
import userReducer from './features/auth/auth-reducer';
import chatReducer from './features/chat/chat-reducer';
import { IMessage } from '../services/types/types';


import {
  connect as messageConnect,
  disconnect as messageDisconnect,
  wsClose as messageWsClose,
  wsConnecting as messageWsConnecting,
  wsError as messageWsError,
  wsMessage as messageWsMessage,
  wsOpen as messageWsOpen,
} from './features/messages/messages-actions';
import messageReducer from './features/messages/messages-reducer';

const messageMiddleware: Middleware = socketMiddleware({
  wsConnect: messageConnect,
  wsDisconnect: messageDisconnect,
  wsConnecting: messageWsConnecting,
  onOpen: messageWsOpen,
  onClose: messageWsClose,
  onError: messageWsError,
  onMessage: messageWsMessage,
});

const store = configureStore({
  reducer: {
    messages: messageReducer,
    user: userReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(messageMiddleware),
});

export default store;
