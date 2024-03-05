/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IUser, IRegisterResponse, IUpdateUserResponse, IUpdateInfo, ILoginInfo,
} from '../../../services/types/types';
import { AppDispatch, AppThunk, AppThunkk } from '../../../services/types';
import { changeUser, registerUser } from '../../../utils/api-requests';

export const registerRequest: AppThunk = (userData: IUser) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await registerUser(userData);
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res));
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
      console.log('nhfkfkf');
      localStorage.setItem('user', JSON.stringify(res));
      return res;
    } catch (error) {
      throw new Error('ошибка при изменении данных.');
    }
  };
};

export const loginUser = createAsyncThunk<
IRegisterResponse,
ILoginInfo,
{ rejectValue: string }
>(
  'user/login',
  async (userData: ILoginInfo, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }
      return await response.json();
    } catch (error: any) {
      console.error('Error: ', error);
      return rejectWithValue(error.message);
    }
  },
);
