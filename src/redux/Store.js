import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './reducer/rootReducer';

export const Store = createStore(rootReducer, applyMiddleware(logger));