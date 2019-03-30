import {combineReducers} from 'redux'

import basis from '../page/basis/reducer/index';
import login from '../page/login/reducer/index';
import home from '../page/reducer/index.jsx';

export default combineReducers({
    basis,
    login,
    home
})