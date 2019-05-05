import {
    EXAMGET_FAIL,
    EXAMSET_FAIL,
    EXAMGET_SUC,
    EXAMSET_SUC,
    EXAMGET_CHANGESTATE,
    EXAMSET_CHANGESTATE,
    EXAMDELETE_FAIL,
    EXAMDELETE_SUC
} from '../actions/index';

let initState = {
    examGetLoading : false, //默认加载数据未完成
    examGetStatus : true, //默认加载成功
    examSetLoading : true, //默认设置数据完成
    examSetStatus : true, //默认设置成功
    errMsg : "", //默认没有错误信息
    examData : [] //默认data
}

export default function examSetterReducer(state = initState , action){
    switch (action.type) {
        case EXAMSET_CHANGESTATE:
            return {
                ...state,
                examGetLoading : false,
                examSetLoading : false
            }
        case EXAMGET_CHANGESTATE:
            return {
                ...state,
                examGetLoading : false
            }
        case EXAMGET_FAIL:
            return {
                ...state,
                examGetLoading : true,
                examGetStatus : false,
                errMsg : action.errMsg
            }
        case EXAMGET_SUC:
            return {
                ...state,
                examGetLoading : true,
                examGetStatus : true,
                examData : action.data,
                errMsg : ""
            }
        case EXAMSET_FAIL:
            return {
                ...state,
                examSetLoading : true,
                examSetStatus : false,
                errMsg : action.errMsg
            }
        case EXAMSET_SUC:
            return {
                ...state,
                examSetLoading : true,
                examSetStatus : true,
                errMsg : ""
            }
        case EXAMDELETE_FAIL:
            return {
                ...state,
                errMsg : action.errMsg
            }
        case EXAMDELETE_SUC:
            return {
                ...state,
                errMsg : ""
            }
        default:
            return state;
    }
}