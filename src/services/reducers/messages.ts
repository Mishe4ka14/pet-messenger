/* eslint-disable default-param-last */

import {
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_FAILED,
  GET_MESSAGES_SUCCESS,
  ADD_MESSAGE,
  TMessagesActions,
} from '../actions/messages';
import { IMessage } from '../types/types';

interface IMessagesState {
  messages: IMessage[];
  messagesRequest: boolean;
  messagesFailed: boolean;
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
      isMine: false,
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
      isMine: false,
    },
    {
      _id: '5',
      text: 'Я тоже занят проектом. Надеюсь, ты скоро закончишь свой.',
      owner: 'user1',
      isMine: false,
    },
  ],
  messagesRequest: false,
  messagesFailed: false,
};

const messagesReducer = (state: IMessagesState = initialState, action: TMessagesActions): IMessagesState => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST: {
      return { ...state, messagesRequest: true, messagesFailed: false };
    }
    case GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        messagesRequest: false,
        messagesFailed: false,
        messages: action.messages,
      };
    }
    case GET_MESSAGES_FAILED: {
      return { ...state, messagesRequest: false, messagesFailed: true };
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    }
    default: {
      return state;
    }
  }
};

export default messagesReducer;
