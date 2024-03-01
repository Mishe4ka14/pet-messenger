/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../../../services/types/types';

export interface RegisterResponse {
  email: string,
  password: string,
  name: string,
  about: string,
  _id: string,
  avatar: string,
}

const registerUser = createAsyncThunk<
  RegisterResponse,
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
      // Обрабатываем ошибку и возвращаем rejectWithValue
      return rejectWithValue(error.message);
    }
  },
);

export default registerUser;
