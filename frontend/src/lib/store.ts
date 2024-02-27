import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './features/messages/messages-slice';
import userReducer from './features/auth/auth-slice';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
