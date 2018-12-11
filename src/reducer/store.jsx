import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootRouter from './index.jsx';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({});

export default createStore(rootRouter,initialState,applyMiddleware(thunk));
