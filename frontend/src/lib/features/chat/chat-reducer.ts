import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { createChatRequest, createChatSuccess, createChatFailed } from './chat-actions';
import { IChat } from '../../../services/types/types';

interface ChatState {
  loading: boolean;
  error: string | null;
  chat: IChat | null | undefined; // Замените any на тип данных чата
}

const initialState: ChatState = {
  loading: false,
  error: null,
  chat: null,
};

const chatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createChatRequest, (state) => {
      return {
        ...state,
        loading: true,
        error: null,
        chat: null,
      };
    })
    .addCase(createChatSuccess, (state, action: PayloadAction<IChat>) => {
      return {
        ...state,
        loading: false,
        error: null,
        chat: action.payload,
      };
    })
    .addCase(createChatFailed, (state, action: PayloadAction<string>) => {
      return {
        ...state,
        loading: false,
        error: action.payload ? action.payload : 'Unknown error',
        chat: null,
      };
    });
});

export default chatReducer;
