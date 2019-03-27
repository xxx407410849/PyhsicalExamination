export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_SUC = "LOGIN_SUC";

import fetch from '../../../common/fetch.jsx';
import {
    Host
} from '../../../config/host.jsx';
export function login(userName, password, type) {
    return dispatch => {
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
                console.log(data,data.ret);
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
                console.log(error);
                return dispatch(loginFail());
            })
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

export function loginout() {
    
}