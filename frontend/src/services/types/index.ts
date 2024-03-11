/* eslint-disable */
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { ActionCreator } from 'redux';
import store from '../../lib/store';
import { TAuthActions } from '../../lib/features/auth/auth-actions';
import { TChatActions } from '../../lib/features/chat/chat-actions';
import { TMessageActions } from '../../lib/features/messages/messages-actions';

export type RootState = ReturnType<typeof store.getState>;

type TAppActions =
   TAuthActions &
   TChatActions &
   TMessageActions

// Типизация thunk
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, unknown, TAppActions>>;
export type AppThunkk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TAuthActions>;

export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;
