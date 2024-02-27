import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../../services/types/types';

interface IMessagesState {
  messages: IMessage[];
}

const initialState: IMessagesState = {
  messages: [
    {
      _id: '1',
      text: 'Привет, как дела?',
      owner: 'user1',
      isMine: false,
    },
    {
      _id: '2',
      text: 'Привет! У меня все отлично, спасибо! А у тебя?',
      owner: 'user2',
      isMine: true,
    },
    {
      _id: '3',
      text: 'У меня тоже хорошо, спасибо за спрос! Чем занимаешься?',
      owner: 'user1',
      isMine: false,
    },
    {
      _id: '4',
      text: 'Сейчас работаю над своим проектом, а ты?',
      owner: 'user2',
      isMine: true,
    },
    {
      _id: '5',
      text: 'Я тоже занят проектом. Надеюсь, ты скоро закончишь свой.',
      owner: 'user1',
      isMine: false,
    },
  ],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    // Добавьте другие действия, если это необходимо
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
