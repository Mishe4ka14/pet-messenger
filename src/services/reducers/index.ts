import { combineReducers, createStore } from 'redux';
import messagesReducer from './messages';

const rootReducer = combineReducers({
  messages: messagesReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
