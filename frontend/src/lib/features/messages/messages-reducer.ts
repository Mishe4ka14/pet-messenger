import { createReducer } from '@reduxjs/toolkit';
import WebsocketStatus from '../../../utils/ws-status';
import {
  wsConnecting, wsClose, wsError, wsMessage, wsOpen,
} from './messages-actions';
import { IMessage } from '../../../services/types/types';

type TMessageState = {
  status: string;
  message: IMessage | null;
  total: null | number;
  totalToday: null | number;
  connectingError: string;
}

const initialState: TMessageState = {
  status: WebsocketStatus.OFFLINE,
  message: null,
  total: null,
  totalToday: null,
  connectingError: '',
};

const messageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    })
    .addCase(wsOpen, (state) => {
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        connectingError: '',
      };
    })
    .addCase(wsClose, (state) => {
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
      };
    })
    .addCase(wsError, (state, action) => {
      return {
        ...state,
        connectingError: action.payload,
      };
    })
    .addCase(wsMessage, (state, action) => {
      return {
        ...state,
        message: action.payload,
      };
    });
});

export default messageReducer;
