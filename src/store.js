import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import auth from './auth/reducers/authReducer';
import page from './general/reducers/pageReducer';
import families from './families/reducers/familyReducer';

export default createStore(
  combineReducers({
    auth,
    page,
    families,
  }),
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
