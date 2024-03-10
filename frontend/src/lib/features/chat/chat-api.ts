/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { IChatOwners } from '../../../services/types/types';
import { AppThunk, AppDispatch } from '../../../services/types';
import { createChatRequest, getChatRequest } from '../../../utils/api-requests';
import getLocalStorage from '../../../hooks/local-storage';

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

export const getChat: AppThunk = (chatID: string | undefined) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await getChatRequest(chatID);
      localStorage.setItem('foundUser', JSON.stringify(res.secondUser));
      const user = getLocalStorage('foundUser');
      console.log(user);
      return res;
    } catch (error) {
      throw new Error('Не получилось создать чат, попробуйте еще раз!');
    }
  };
};
