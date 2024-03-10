import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './features/messages/messages-slice';
import userReducer from './features/auth/auth-reducer';
import chatReducer from './features/chat/chat-reducer';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
    chat: chatReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
