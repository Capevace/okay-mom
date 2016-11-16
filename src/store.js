import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import tasks from './todo/reducers/tasksReducer';
import auth from './auth/reducers/auth';
import page from './general/reducers/pageReducer';

export default createStore(
  combineReducers({
    tasks,
    auth,
    page,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
