import {combineReducers} from 'redux'

import home from '../page/reducer/index.jsx';
import login from '../page/login/reducer/index';
import global from '../global/reducer/index'

export default combineReducers({
    home,
    login,
    global
})