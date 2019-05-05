
import {
    LOGIN_FAIL,
    LOGIN_SUC,
    RELOGIN,
    LOGINOUT_SUC,
    LOGINOUT_FAIL,
    CHANGECODE_FAIL,
    CHANGECODE_SUC,
    LOGIN
} from '../action/index';
let initState = {
    loginLoading: false, //默认加载未完成
    loginStatus: false, //默认未登录
    loginUser: "", //默认登陆用户为空
    errorMsg: "", //默认没有错误信息
    userType: "", //默认无用户权限
    changeCodeMsg: "" //默认无修改密码feedback
}

export default function loginReducer(state = initState, action) {
    switch (action.type) {
        case LOGIN: 
            return {
                ...state,
                loginLoading: false,
                loginStatus: false,
                errorMsg: "",
                errorCode: ""
            }
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
                userType: action.data.data.type,
                errorMsg: "",
                errorCode: ""
            }
        case RELOGIN:
            return {
                ...state,
                loginLoading: true,
                loginStatus: true,
                loginUser: action.data.userName,
                userType: action.data.type,
                errorMsg: "",
                errorCode: ""
            }
        case LOGINOUT_FAIL:
            return {
                ...state
            }
        case LOGINOUT_SUC:
            return {
                ...state,
                loginLoading: false,
                loginStatus: false,
                loginUser: "",
                userType: "",
                errorMsg: "",
                errorCode: ""
            }
        case CHANGECODE_SUC:
            return {
                ...state,
                changeCodeMsg: "修改成功"
            }
        case CHANGECODE_FAIL:
            return {
                ...state,
                changeCodeMsg: "修改失败 " + action.data.errorMsg 
            }
        default:
            return state
    }
}