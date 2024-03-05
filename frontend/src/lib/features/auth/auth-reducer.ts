import { createReducer } from '@reduxjs/toolkit';
import { registerFailed } from './auth-actions';
import { IUser } from '../../../services/types/types';

interface IUserState {
  user: IUser | null
  error: string | undefined,
  registerFailed: boolean,
}

const initialState: IUserState = {
  user: null,
  error: undefined,
  registerFailed: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerFailed, (state, action) => ({
      ...state,
      registerFailed: true,
      error: action.payload,
    }));
});

export default authReducer;
