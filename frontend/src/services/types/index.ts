/* eslint-disable */
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../lib/store';
import { Action, ActionCreator } from 'redux';
import { TAuthActions } from '../../lib/features/auth/auth-actions';

// Типизация thunk
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, unknown, TAuthActions>>;
export type AppThunkk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TAuthActions>;

export type AppDispatch = ThunkDispatch<RootState, unknown, TAuthActions>;