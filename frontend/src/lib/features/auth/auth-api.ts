/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IUser, IRegisterResponse, IUpdateUserResponse, IUpdateInfo, ILoginInfo,
} from '../../../services/types/types';

export const registerUser = createAsyncThunk<
  IRegisterResponse,
  IUser,
  { rejectValue: string }
>(
  'user/register',
  async (userData: IUser, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Error: ', error);
      // Обрабатываем ошибку и возвращаем rejectWithValue
      return rejectWithValue(error.message);
    }
  },
);

export const updateUser = createAsyncThunk<
IUpdateUserResponse,
IUpdateInfo,
{ rejectValue: string }
>(
  'user/updateInfo',
  async (userData: IUpdateInfo, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/user/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user info');
      }
      return await response.json();
    } catch (error: any) {
      console.error('Error: ', error);
      return rejectWithValue(error.message);
    }
  },
);

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
