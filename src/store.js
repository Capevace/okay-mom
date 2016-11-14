import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import tasks from './todo/reducers/tasks';
import auth from './auth/reducers/auth';


export default createStore(
  combineReducers({
    tasks,
    auth,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
