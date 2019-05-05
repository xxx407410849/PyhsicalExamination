import fetch from "../../../common/fetch.jsx";
import { Host } from '../../../config/host.jsx';

export const ScoreAction = {
    GETCLASSINFO : "GETCLASSINFO",
    GETCLASSINFO_SUC : "GETCLASSINFO_SUC",
    GETCLASSINFO_FAIL : "GETCLASSINFO_FAIL",
    GETSCOREINFO : "GETSTUINFO",
    GETSCORE_SUC : "GETSCORE_SUC",
    GETSCORE_FAIL : "GETSCORE_FAIL",
    SETSCORE : "SETSCORE",
    SETSCORE_SUC : "SETSCORE_SUC",
    SETSCORE_FAIL : "SETSCORE_FAIL"
}

export function getClassInfo(){
    return dispatch => {
        dispatch(getClass());
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.getClassInfo,
            method : "GET"
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(getClassInfoSuc(data.data));
            }else{
                dispatch(getClassInfoFail(data.errMsg));
            }
        })
        .catch((err)=>{
            dispatch(getClassInfoFail());
        })
    }
}

const getClass = () => {
    return {
        type : ScoreAction.GETCLASSINFO
    }
}
const getClassInfoFail = (errMsg = "网络连接失败") => {
    return {
        type : ScoreAction.GETCLASSINFO_FAIL,
        errMsg : errMsg
    }
}

const getClassInfoSuc = (data) => {
    return {
        type : ScoreAction.GETCLASSINFO_SUC,
        data : data
    }
}

export function getScore(key){

    return dispatch => {
        dispatch(getScoreStateChange());
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.getScore,
            data : {
                key : key
            }
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(getScoreSuc(data.data));
            }else{
                dispatch(getScoreFail(data.errMsg));
            }
        })
        .catch((err)=>{
            dispatch(getScoreFail())
        })
    }
}
const getScoreStateChange = () => {
    return {
        type : ScoreAction.GETSCOREINFO
    }
}
const getScoreSuc = (data) => {
    return {
        type : ScoreAction.GETSCORE_SUC,
        data : data
    }
}

const getScoreFail = (errMsg = "网络连接失败") => {
    return {
        type : ScoreAction.GETSCORE_FAIL,
        errMsg : errMsg
    }
}

export function setScore(data,callBack){
    return dispatch => {
        dispatch(setScoreChangeState());
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.importScore,
            data : data
        }
        let _data = data;
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(setScoreSuc(data.msg));
                callBack();
                dispatch(getScore(_data.key));
            }else{
                dispatch(setScoreFail(data.errMsg));
            }
        })
        .catch((err)=>{
            console.log(err);
            dispatch(setScoreFail());
        })
    }
}

const setScoreChangeState = () => {
    return {
        type : ScoreAction.SETSCORE
    }
}

const setScoreFail = (errMsg = "网络连接失败") => {
    return {
        type : ScoreAction.SETSCORE_FAIL,
        errMsg : errMsg
    }
}

const setScoreSuc = (msg) => {
    return {
        type : ScoreAction.SETSCORE_SUC,
        msg : msg
    }
}