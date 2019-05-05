import {
    SETSTU_FAIL,
    SETSTU_SUC,
    DELETESTU_FAIL,
    DELETESTU_SUC,
    GETROUND_FAIL,
    GETROUND_SUC,
    GETSTU_SUC,
    GETSTU_FAIL,
    GETSTU,
    SETSTU
} from '../actions/index';

let initState = {
    stuGetLoading : false, //默认加载学生数据未完成
    stuGetStatus : true, //默认加载成功
    errMsg : "", //默认没有错误信息
    roundData : [], //批次信息
    stuData : [], //学生信息
    stuSetStatus : true, //默认设置学生数据成功
    stuSetMsg : [] //设置学生的反馈消息
}

export default function stuSetterReducer(state = initState , action){
    console.log(action.type);
    switch (action.type) {
        case SETSTU:
            return {
                ...state,
                stuSetStatus : false
            }
        case SETSTU_FAIL:
            return {
                ...state,
                errMsg : action.errMsg,
                stuSetStatus : true
            }
        case SETSTU_SUC:
            return {
                ...state,
                errMsg : "",
                stuSetMsg : action.data,
                stuSetStatus : true
            }
        case DELETESTU_FAIL:
            return {
                ...state,
                errMsg : action.errMsg
            }
        case DELETESTU_SUC:
            return {
                ...state,
                errMsg : ""
            }
        case GETROUND_SUC:
            return {
                ...state,
                errMsg : "",
                roundData : action.data
            }
        case GETROUND_FAIL:
            return {
                ...state,
                errMsg : action.errMsg
            }
        case GETSTU:
            return {
                ...state,
                stuGetLoading : false
            }
        case GETSTU_FAIL:
            return {
                ...state,
                errMsg : action.errMsg,
                stuGetLoading : true
            }
        case GETSTU_SUC:
            return {
                ...state,
                errMsg : "",
                stuData : action.data,
                stuGetLoading : true
            }
        default:
            return state;
    }
}