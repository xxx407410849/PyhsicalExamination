export const GETCLASSNAME_SUC = 'GETCLASSNAME_SUC';
export const GETCLASSNAME_FAIL = 'GETCLASSNAME_FAIL';
export const SUBSET_SUC = 'SUBSET_SUC';
export const SUBSET_FAIL = 'SUBSET_FAIL';
import fetch from '../../../../../../../common/fetch.jsx'
import { Host } from '../../../../../../../config/host.jsx';
export function getClassName(){
    return dispatch => {
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.getClassName,
            method : "GET"
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(getClassNameSuc(data.data));
            }else{
                dispatch(getClassNameFail(data.errMsg));
            }

        })
        .catch((err)=>{
            dispatch(getClassNameFail());
        })
    }
}
const getClassNameSuc = (data) => {
    return {
        type : GETCLASSNAME_SUC,
        data : data
    }
}
const getClassNameFail = (errMsg = "网络连接失败") => {
    return {
        type : GETCLASSNAME_FAIL,
        errMsg : errMsg
    }
}

export function setSub(data,callback){
    return dispatch => {
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.setSub,
            data : data
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(setSubSuc(data.data));
                callback();
                dispatch(getClassName());
            }else{
                dispatch(setSubFail(data.errMsg));
            }
        })
        .catch((err)=>{
            dispatch(setSubFail());
        })
    }
}
const setSubSuc = (data) => {
    return {
        type : SUBSET_SUC,
        data : data
    }
}
const setSubFail = (errMsg = "网络连接失败") => {
    return {
        type : SUBSET_FAIL,
        errMsg : errMsg
    }
}