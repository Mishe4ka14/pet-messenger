/* eslint-disable */
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../lib/store';
import { addMessage } from '../../lib/features/messages/messages-slice';
import registerUser from '../../lib/features/auth/auth-api';
import { Action } from 'redux';

// Определяем тип для обычных действий (action creators)
type RegularAction = ReturnType<typeof addMessage>;

// Определяем тип для асинхронных действий (thunks)
type ThunkActionType = ThunkAction<void, RootState, unknown, RegularAction>;

// Определяем тип для диспетчера с учетом thunk
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

// Определяем тип для асинхронных thunk
export type AppThunk<ReturnType = void> = ThunkActionType;