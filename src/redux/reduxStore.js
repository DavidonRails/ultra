import thunkMiddleware from 'redux-thunk';
import registerReducer from './registerReducer';
import appReducer from './appReducer';

const {createStore, combineReducers, applyMiddleware} = require('redux');

let reducers = combineReducers({
  registerPage: registerReducer,
  appPage: appReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
