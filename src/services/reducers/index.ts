import { combineReducers, createStore } from 'redux';
import messagesReducer from './messages';

const rootReducer = combineReducers({
  messages: messagesReducer,
});

const store = createStore(rootReducer);

export default store;
