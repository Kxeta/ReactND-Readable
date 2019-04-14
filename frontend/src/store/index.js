import { createStore, applyMiddleware, compose } from 'redux';
import Reducers from '../reducers';
import thunk from 'redux-thunk';

const store = (initialState = {}) =>
  createStore(
    Reducers,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

export default store;
