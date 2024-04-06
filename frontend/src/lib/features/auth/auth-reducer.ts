import { createReducer } from '@reduxjs/toolkit';
import { registerFailed, setAuthChecked } from './auth-actions';
import { IUser } from '../../../services/types/types';

interface IUserState {
  user: IUser | null
  error: string | undefined,
  registerFailed: boolean,
  isAuthChecked: boolean;
}

const initialState: IUserState = {
  user: null,
  error: undefined,
  registerFailed: false,
  isAuthChecked: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerFailed, (state, action) => ({
      ...state,
      registerFailed: true,
      error: action.payload,
    }))
    .addCase(setAuthChecked, (state, action) => ({
      ...state,
      isAuthChecked: action.payload,
    }));
});

export default authReducer;
