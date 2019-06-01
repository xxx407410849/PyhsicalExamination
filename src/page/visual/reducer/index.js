import { VisualAction } from "../actions";


let initState = {
    stuScoreData : [], //成绩数据
    getStuScoreStatus : false, //默认没有拉取到成绩
    errMsg : ""
}

export default function scoreReducer(state = initState , action){
    switch (action.type) {
        case VisualAction.GETSTUSCORE :
            return {
                ...state,
                errMsg : "",
                getStuScoreStatus : false
            }
        case VisualAction.GETSTUSCORE_FAIL :
            return {
                ...state,
                errMsg : action.errMsg,
                getStuScoreStatus : true
            }
        case VisualAction.GETSTUSCORE_SUC :
            return {
                ...state,
                errMsg : "",
                stuScoreData : action.data,
                getStuScoreStatus : true
            }
        default:
            return state;
    }
}