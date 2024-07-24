/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie';
import {
  IUser, ISearchUser,
} from '../../../services/types/types';
import { AppDispatch, AppThunk, AppThunkk } from '../../../services/types';
import {
  changeUser, findUserByNameOrEmail, loginUserRequest, registerUser,
} from '../../../utils/api-requests';

export const registerRequest: AppThunk = (userData: IUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await registerUser(userData);
      console.log(res);
      Cookies.set('user', JSON.stringify(res), { expires: 7 });
    } catch (error) {
      throw new Error('Этот имейл уже занят! Пожалуйста, попробуй другой.');
    }
  };
};

export const updateUserInfo: AppThunk = (userData: IUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await changeUser(userData);
      console.log(res);
      Cookies.set('user', JSON.stringify(res), { expires: 7 });
      return res;
    } catch (error) {
      throw new Error('ошибка при изменении данных.');
    }
  };
};

export const findUser: AppThunk = (userData: ISearchUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res: IUser = await findUserByNameOrEmail(userData);

      Cookies.set('foundUser', JSON.stringify(res), { expires: 1 / 24 });
      return res;
    } catch (error: any) {
      // Обработка ошибки
      throw new Error(`Ошибка при поиске пользователя: ${error.message}`);
    }
  };
};

export const loginUser: AppThunk = (userData: IUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await loginUserRequest(userData);
      console.log(res);
      Cookies.set('user', JSON.stringify(res), { expires: 7 });
    } catch (error) {
      throw new Error('Неправильные почта или пароль!');
    }
  };
};
