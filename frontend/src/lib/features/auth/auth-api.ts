import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../../../services/types/types';

interface RegisterResponse {
  email: string,
  password: string,
  name: string,
  about: string,
  _id: string,
  avatar: string,
}

const registerUser = createAsyncThunk<
RegisterResponse, // Тип данных, возвращаемых сервером после успешной регистрации
IUser, // Тип данных, передаваемых в функцию для регистрации пользователя
{ rejectValue: string } // Тип данных для конфигурации обработчика ошибок
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
      return rejectWithValue(error.message);
    }
  },
);

export default registerUser;
