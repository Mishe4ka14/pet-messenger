/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable */

import { Middleware } from 'redux';
import { Action } from '@reduxjs/toolkit';
import { RootState } from '../../services/types/index';
import { IMessage } from '../../services/types/types';

export type TMiddlewareActions = ({
  wsConnect: Action
  wsDisconnect: Action
  wsConnecting: Action
  onOpen: Action
  onClose: Action
  onError(error: string): Action
  onMessage(message: IMessage): Action
});

export const socketMiddleware = (wsActions: TMiddlewareActions): Middleware<RootState> => {
  return (store) => (next) => (action: any) => {
    let socket: WebSocket | null = null;

    const { dispatch } = store;
    const { type } = action;
    const {
      wsConnect,
      onOpen,
      onClose,
      onError,
      onMessage,
      wsConnecting,
      wsDisconnect,
    } = wsActions;

    if (type === wsConnect.type) {
      if (!socket) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting);
      }
    }

    if (socket) {
      socket.onopen = () => {
        dispatch(onOpen);
      };

      socket.onerror = (event) => {
        dispatch(onError('Error'));
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);

        dispatch(onMessage(parsedData));
      };

      socket.onclose = (event) => {
        dispatch(onClose);
      };

      if (wsDisconnect.type === type) {
        socket.close();
        socket = null;
      }
    }

    return next(action);
  };
};
