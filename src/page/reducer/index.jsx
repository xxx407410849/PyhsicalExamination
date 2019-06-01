import {
    ISLOGIN_FAIL,
    ISLOGIN_TRUE
} from '../action/index.jsx';
import {
    LOGINOUT_HOME
} from '../login/action/index';
let initState = {
    userName: "",
    type: "",
    reloadStatus: false //默认未完成重新登录
}

export default function homeReducer(state = initState, action) {
    switch (action.type) {
        case ISLOGIN_FAIL:
            return {
                ...state,
                reloadStatus: true
            }
        case ISLOGIN_TRUE:
            return {
                ...state,
                userName: action.data.userName,
                    type: action.data.type,
                    reloadStatus: true
            }
        case LOGINOUT_HOME:
            return {
                ...state,
                userName: "",
                type: "",
                reloadStatus: false
            }
            default:
                return state;
    }
}