import fetch from "../../../../../../../common/fetch.jsx";
import {
    Host
} from '../../../../../../../config/host.jsx';

export const EXAMSET_SUC = 'EXAMSET_SUC';
export const EXAMSET_FAIL = 'EXAMSET_FAIL';
export const EXAMGET_SUC = 'EXAMGET_SUC';
export const EXAMGET_FAIL = 'EXAMGET_FAIL';
export const EXAMSET_CHANGESTATE = 'EXAMSET_CHANGESTATE';
export const EXAMGET_CHANGESTATE = 'EXAMGET_CHANGESTATE';
export const EXAMDELETE_SUC = 'EXAMDELETE_SUC';
export const EXAMDELETE_FAIL = 'EXAMDELETE_FAIL';
export function examSetChangeState() {
    return {
        type: EXAMSET_CHANGESTATE
    }
}
export function examSet(data) {
    return dispatch => {
        dispatch(examSetChangeState());
        let options = {
            url: Host.prodHost.nodeHost + Host.hosts.setExam,
            data: data
        }
        fetch(options).then((data) => {
            if (data.ret) {
                dispatch(examSetSuc());
            } else {
                dispatch(examSetFail(data.errMsg));
            }
            dispatch(examGet());
        }).catch(() => {
            dispatch(examSetFail());
        })
    }
}
const examSetSuc = () => {
    return {
        type: EXAMSET_SUC
    };
}
const examSetFail = (errMsg = "网络连接失败") => {
    return {
        type: EXAMSET_FAIL,
        errMsg: errMsg
    }
}
const examGetChangeState = () => {
    return {
        type: EXAMGET_CHANGESTATE
    }
}
export function examGet() {
    return dispatch => {
        dispatch(examGetChangeState());
        let options = {
            url: Host.prodHost.nodeHost + Host.hosts.findExam,
            method: "GET"
        }
        fetch(options).then((data) => {
            if (data.ret) {
                dispatch(examGetSuc(data.data));
            } else {
                dispatch(examGetFail(data.errMsg));
            }
        }).catch((err) => {
            dispatch(examGetFail());
        })
    }
}
const examGetSuc = (data) => {
    return {
        type: EXAMGET_SUC,
        data: data
    }
}
const examGetFail = (errMsg) => {
    return {
        type: EXAMGET_FAIL,
        errMsg: errMsg
    }
}
export function examDelete(key){
    return dispatch => {
        // let year = key.slice(2,-2).slice(0,4);
        // let round = key.slice(2,-2).slice(4);
        key = key.slice(0,-2);
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.deleteExam,
            data : {
                key : key
            }
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(examDeleteSuc());
                dispatch(examGet());
            }else{
                dispatch(examDeleteFail(data.errMsg));
            }
        })
        .catch((err)=>{
            dispatch(examDeleteFail());
        })
    }
}
const examDeleteSuc = () => {
    return {
        type : EXAMDELETE_SUC
    }
}
const examDeleteFail = (errMsg = "网络连接失败") => {
    return {
        type : EXAMDELETE_FAIL,
        errMsg : errMsg
    }
}