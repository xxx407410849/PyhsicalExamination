import {combineReducers} from 'redux'

import basis from '../page/basis/reducer/index';
import login from '../page/login/reducer/index';
import home from '../page/reducer/index.jsx';
import examset from '../page/basis/components/body/components/examSetter/reducer/index';
import subset from '../page/basis/components/body/components/subSetter/reducer/index';
import stuset from '../page/basis/components/body/components/studentSetter/reducer/index';
import score from '../page/score/reducer/index';
export default combineReducers({
    basis,

    login,

    home,
    examset,
    subset,
    stuset,

    score
})