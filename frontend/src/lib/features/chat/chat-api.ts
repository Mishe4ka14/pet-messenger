/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import { IChatOwners } from '../../../services/types/types';
import { AppThunk, AppDispatch } from '../../../services/types';
import { createChatRequest, getChatRequest } from '../../../utils/api-requests';

export const createChat: AppThunk = (userID: IChatOwners) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await createChatRequest(userID);
      return res;
    } catch (error) {
      throw new Error('Не получилось создать чат, попробуйте еще раз!');
    }
  };
};

export const getChat: AppThunk = (chatID: string | undefined, userID) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await getChatRequest(chatID, userID);
      Cookies.set('foundUser', JSON.stringify(res.secondUser));
      const user = Cookies.get('foundUser');
      console.log(user);
      return res;
    } catch (error) {
      throw new Error('Не получилось создать чат, попробуйте еще раз!');
    }
  };
};
