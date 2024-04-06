import { createAction } from '@reduxjs/toolkit';

export const registerRequest = createAction('auth/request');
export const registerSuccess = createAction('auth/success');
export const registerFailed = createAction('auth/failed');
export const setAuthChecked = createAction<boolean>('auth/checked');

export type TAuthActions =
  | ReturnType<typeof registerRequest>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailed>
  | ReturnType<typeof setAuthChecked>;
