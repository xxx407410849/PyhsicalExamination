import fetch from '../../../../../../../common/fetch.jsx';
import { Host } from '../../../../../../../config/host.jsx';

export const GETROUND_SUC = 'GETROUND_SUC';
export const GETROUND_FAIL = 'GETROUND_FAIL';
export const SETSTU = 'SETSTU';
export const SETSTU_SUC = 'SETSTU_SUC';
export const SETSTU_FAIL = 'SETSTU_FAIL';
export const DELETESTU_SUC = 'DELETESTU_SUC';
export const DELETESTU_FAIL = 'DELETESTU_FAIL';
export const GETSTU = 'GETSTU';
export const GETSTU_SUC = 'GETSTU_SUC';
export const GETSTU_FAIL = 'GETSTU_FAIL';


export function getRound(){
    return dispatch => {
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.getRound,
            method : "GET"
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(getRoundSuc(data.data));
            }else{
                dispatch(getRoundFail(data.errMsg));
            }
        })
        .catch((err)=>{
            dispatch(getRoundFail());
        });
        return {
            type : GETSTU
        }
    }
}

const getRoundFail = (errMsg = "网络连接错误") => {
    return {
        type : GETROUND_FAIL,
        errMsg : errMsg
    }
}

const getRoundSuc = (data) => {
    return {
        type : GETROUND_SUC,
        data : data
    }
}

export function deleteStu(list){
    return dispatch => {
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.deleteStu,
            data : list
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(deleteStuSuc());
                dispatch(getStu());
            }else{
                dispatch(deleteStuFail(data.errMsg));
            }
        })
        .catch((err)=>{
            dispatch(deleteStuFail());
        })
    }
}

const deleteStuFail = (errMsg = "网络连接错误") => {
    return {
        errMsg : errMsg,
        type : DELETESTU_FAIL
    }
}

const deleteStuSuc = () => {
    return {
        type : DELETESTU_SUC
    }
}

export function setStu(data,callback){
    return dispatch => {
        dispatch(setStuState());
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.importStu,
            data : data
        }
        let _data = data;
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(setStuSuc(data.msg));
                dispatch(getStu(_data.round));
                if(callback)callback(data.msg);
            }else{
                dispatch(setStuFail(data.errMsg));
            }
        })
        .catch((err)=>{
            dispatch(setStuFail());
        })
    }
}
const setStuState = () => {
    return {
        type : SETSTU
    }
}
const setStuFail = (errMsg = "网络连接错误") => {
    return {
        type : SETSTU_FAIL,
        errMsg : errMsg
    }
}

const setStuSuc = (data) => {
    return {
        type : SETSTU_SUC,
        data : data
    }
}
let predKey = "";
export function getStu(key){
    if(!key){
        key = predKey;
    }else{
        predKey = key;
    }
    return dispatch => {
        dispatch(getStuState());
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.getStu,
            data : {
                key : key
            }
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(getStuSuc(data.data));
            }else{
                dispatch(getStuFail(data.errMsg));
            }
        })
        .catch((err)=>{
            dispatch(getStuFail());
        })
    }
}
const getStuState = () => {
    return {
        type : GETSTU
    }
}
const getStuFail = (errMsg = "网络连接错误") => {
    return {
        type : GETSTU_FAIL,
        errMsg : errMsg
    }
}

const getStuSuc = (data) => {
    return {
        type : GETSTU_SUC,
        data : data
    }
}