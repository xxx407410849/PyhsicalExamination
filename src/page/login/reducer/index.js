
import {
    LOGIN_FAIL,
    LOGIN_SUC
} from '../action/index';
let initState = {
    loginLoading: false, //默认加载未完成
    loginStatus: false, //默认未登录
    loginUser: "", //默认登陆用户为空
    errorMsg: "", //默认没有错误信息
    userType: "" //默认无用户权限
}

export default function loginReducer(state = initState, action) {
    switch (action.type) {
        case LOGIN_FAIL:
            return {
                ...state,
                loginLoading: true,
                loginStatus: false,
                errorMsg: action.data.errMsg,
                errorCode: action.data.errorCode
            }
        case LOGIN_SUC:
            return {
                ...state,
                loginLoading: true,
                loginStatus: true,
                loginUser: action.data.data.userName,
                userType: action.data.data.type
            }
        default:
            return state
    }
}