import {
    SUBSET_FAIL,
    SUBSET_SUC,
    GETCLASSNAME_FAIL,
    GETCLASSNAME_SUC
} from '../actions/index';

let initState = {
    nameData : [], //批次表
    errMsg : "",
    setStatus : false //默认设置科目失败
}

export default function subSetterReducer(state = initState , action){
    switch (action.type) {
        case SUBSET_FAIL:
            return {
                ...state,
                errMsg : action.errMsg,
                setStatus : false
            }
        case SUBSET_SUC:
            return {
                ...state,
                setStatus : true
            }
        case GETCLASSNAME_FAIL:
            return {
                ...state,
                errMsg : action.errMsg,
                setStatus : false
            }
        case GETCLASSNAME_SUC:
            return {
                ...state,
                nameData : action.data,
                setStatus : false
            }
        default:
            return state;
    }
}