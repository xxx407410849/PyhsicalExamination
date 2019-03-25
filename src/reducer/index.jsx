import { combineReducers } from 'redux-immutable';

import home from '../page/reducer/index.jsx';
import login from '../page/login/reducer/index'

export default combineReducers({
    home,
    login
})