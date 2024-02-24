import { IMessage } from '../types/types';

export const GET_MESSAGES_REQUEST:'GET_MESSAGES_REQUEST' = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS:'GET_MESSAGES_SUCCESS' = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAILED:'GET_MESSAGES_FAILED' = 'GET_MESSAGES_FAILED';

export interface IGetMessagesAction {
  readonly type: typeof GET_MESSAGES_REQUEST;
}

export interface IGetMessagesFailedAction {
  readonly type: typeof GET_MESSAGES_FAILED;
}

export interface IGetMessagesSuccessAction {
  readonly type: typeof GET_MESSAGES_SUCCESS;
  readonly messages: IMessage[];
}

// Объединяем в Union
export type TMessagesActions =
  | IGetMessagesAction
  | IGetMessagesFailedAction
  | IGetMessagesSuccessAction;
