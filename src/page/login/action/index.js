export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUC = "LOGIN_SUC";
export const RELOGIN = 'RELOGIN';
export const LOGINOUT_SUC = "LOGINOUT_SUC";
export const LOGINOUT_FAIL = "LOGINOUT_FAIL";
export const CHANGECODE_FAIL = "CHANGECODE_FAIL";
export const CHANGECODE_SUC = "CHANGECODE_SUC";


import fetch from '../../../common/fetch.jsx';

import { message } from 'antd';
import {
    Host
} from '../../../config/host.jsx';
export function login(userName, password, type) {
    return dispatch => {
        dispatch(loginChangeState());
        let options = {
            url: Host.prodHost.nodeHost + Host.hosts.login,
            data: {
                userName: userName,
                passWord: password,
                type: type
            }
        }
        fetch(options)
            .then((data) => {
                switch (data.ret) {
                    case true:
                        return dispatch(loginSuc(data));
                    case false:
                        return dispatch(loginFail(data));
                    default:
                        return dispatch(loginFail(data));

                }
            })
            .catch((error) => {
                return dispatch(loginFail());
            })
    }
}
const loginChangeState = () => {
    return {
        type : LOGIN
    }
}
const loginSuc = (data) => {
    return {
        type: LOGIN_SUC,
        data: data
    }
}

const loginFail = (data) => {
    if (!data) {
        var data = {
            errMsg: "网络连接失败",
            errCode: 4
        }
    }
    return {
        type: LOGIN_FAIL,
        data: data
    }
}
export function relogin(userName, type) {
    return {
        type: RELOGIN,
        data: {
            userName: userName,
            type: type
        }
    }
}
export function loginout() {
    return dispatch => {
        let options = {
            url: Host.prodHost.nodeHost + Host.hosts.loginout,
            method: "GET"
        }
        fetch(options).then((data) => {
                if (data.ret) {
                    dispatch(loginoutSuc());
                } else {
                    dispatch(loginoutFail());
                }
            })
            .catch(() => {
                dispatch(loginoutFail());
            })
    }
}
const loginoutSuc = () => {
    return {
        type: LOGINOUT_SUC
    }
}
const loginoutFail = () => {
    return {
        type: LOGINOUT_FAIL
    }
}
export function changeCode(userName, type, passWord, passWordF, passWordS) {
    return dispatch => {
        let options = {
            url: Host.prodHost.nodeHost + Host.hosts.changeCode,
            data: {
                userName: userName,
                type: type,
                passWord: passWord,
                passWordF: passWordF,
                passWordS: passWordS
            }
        }
        fetch(options).then((data) => {
                if (data.ret) {
                    dispatch(changeCodeSuc());
                    message.success("修改密码成功");
                } else {
                    dispatch(changeCodeFail(data.errMsg));
                    message.success("修改密码失败");
                }
            })
            .catch((error) => {
                dispatch(changeCodeFail())
            })
    }
}
const changeCodeFail = (msg) => {
    return {
        type : CHANGECODE_FAIL,
        data : {
            errorMsg : msg
        }
    }
}

const changeCodeSuc = () => {
    return {
        type : CHANGECODE_SUC
    }
}