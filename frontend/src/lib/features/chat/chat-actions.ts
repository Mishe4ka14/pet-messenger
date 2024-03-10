import { createAction } from '@reduxjs/toolkit';
import { IChatOwners, IChat } from '../../../services/types/types';

export const createChatRequest = createAction<IChatOwners>('chat/request');
export const createChatSuccess = createAction<IChat>('chat/success');
export const createChatFailed = createAction<string>('chat/failed'); // Возможно, здесь нужно другое значение типа

export type TChatActions =
  | typeof createChatRequest
  | typeof createChatSuccess
  | typeof createChatFailed;
