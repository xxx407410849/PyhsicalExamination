import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootRouter from './index.jsx';


export default createStore(rootRouter,applyMiddleware(thunk));
