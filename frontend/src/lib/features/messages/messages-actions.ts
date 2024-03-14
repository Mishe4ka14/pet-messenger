import { createAction } from '@reduxjs/toolkit';
import { IMessage } from '../../../services/types/types';

export const connect = createAction<string>('orders/conenct');
export const disconnect = createAction('orders/disconnect');
export const wsConnecting = createAction('orders/wsConnecting');
export const wsOpen = createAction('orders/wsOpen');
export const wsClose = createAction('orders/wsClose');
export const wsMessage = createAction<IMessage>('orders/wsMessage');
export const wsError = createAction<string>('orders/wsError');

export type TMessageActions =
    | ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;
