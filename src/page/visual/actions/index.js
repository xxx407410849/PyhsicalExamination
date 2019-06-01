import fetch from "../../../common/fetch.jsx";
import { Host } from '../../../config/host.jsx';
import utils from "../../../common/utils.jsx";

export const VisualAction = {
    GETSTUSCORE : "GETSTUSCORE",
    GETSTUSCORE_SUC : "GETSTUSCORE_SUC",
    GETSTUSCORE_FAIL : "GETSTUSCORE_FAIL"
}

export function getStuScore(key,callBack){
    return dispatch => {
        dispatch(getStuScoreChangeState());
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.getStuScore,
            data : {
                key : key
            }
        }
        fetch(options).then((data)=>{
            if(data.ret){
                dispatch(getStuScoreSuc(utils.mixedScore(data.data)));
            }else{
                dispatch(getStuScoreFail(data.errMsg));
                callBack(data.errMsg);
            }
        }).catch((err)=>{
            console.log(err);
            callBack("网络连接失败");
        })
    }
}
const getStuScoreChangeState = () => {
    return {
        type : VisualAction.GETSTUSCORE
    }
}
const getStuScoreSuc = (data) => {
    return {
        type : VisualAction.GETSTUSCORE_SUC,
        data : data
    }
}
const getStuScoreFail = (errMsg = "网络连接失败") => {
    return {
        type : VisualAction.GETSTUSCORE_FAIL,
        errMsg : errMsg
    }
}