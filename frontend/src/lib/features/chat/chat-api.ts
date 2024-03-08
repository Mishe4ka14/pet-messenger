/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { IChatOwners } from '../../../services/types/types';
import { AppThunk, AppDispatch } from '../../../services/types';
import { createChatRequest } from '../../../utils/api-requests';

const createChat: AppThunk = (userID: IChatOwners) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await createChatRequest(userID);
      return res;
      // localStorage.setItem('user', JSON.stringify(res));
    } catch (error) {
      throw new Error('Не получилось создать чат, попробуйте еще раз!');
    }
  };
};

export default createChat;
