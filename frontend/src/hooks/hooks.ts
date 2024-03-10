import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as useReduxDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { AppDispatch } from '../services/types/index';

export const useDispatch = () => useReduxDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
