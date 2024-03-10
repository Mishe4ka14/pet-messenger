/* eslint-disable */
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { ActionCreator } from 'redux';
import { RootState } from '../../lib/store';
import { TAuthActions } from '../../lib/features/auth/auth-actions';
import { TChatActions } from '../../lib/features/chat/chat-actions';

type TAppActions =
   TAuthActions &
   TChatActions

// Типизация thunk
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, unknown, TAppActions>>;
export type AppThunkk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TAuthActions>;

export type AppDispatch = ThunkDispatch<RootState, unknown, TAuthActions>;
