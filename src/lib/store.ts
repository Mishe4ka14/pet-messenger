import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './features/messages/messages-slice';

const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
