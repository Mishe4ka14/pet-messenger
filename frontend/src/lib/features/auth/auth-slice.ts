/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../services/types/types';
import {registerUser, updateUser, loginUser} from './auth-api';

interface IUserState {
  user: IUser | null
}


const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      // Обработка ошибки
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log('все окк')
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      // Обработка ошибки при обновлении информации о пользователе
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log('все окк')
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      // Обработка ошибки при обновлении информации о пользователе
    });
  },
});
export default userSlice.reducer;
