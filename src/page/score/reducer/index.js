import { ScoreAction } from "../actions";


let initState = {
    nameData : [], //class数据
    scoreData : [], //成绩数据
    getScoreStatus : false, //默认没有拉取到成绩
    errMsg : "",
    msg : []
}

export default function scoreReducer(state = initState , action){
    switch (action.type) {
        case ScoreAction.GETCLASSINFO : 
            return state;
        case ScoreAction.GETCLASSINFO_FAIL :
            return {
                ...state,
                errMsg : action.errMsg
            }
        case ScoreAction.GETCLASSINFO_SUC :
            return {
                ...state,
                errMsg : "",
                nameData : action.data
            }
        case ScoreAction.GETSCOREINFO :
            return {
                ...state,
                getScoreStatus : false
            }
        case ScoreAction.GETSCORE_FAIL :
            return {
                ...state,
                errMsg : action.errMsg,
                getScoreStatus : true,
                scoreData : []
            }
        case ScoreAction.GETSCORE_SUC :
            return {
                ...state,
                errMsg : "",
                scoreData : action.data,
                getScoreStatus : true
            }
        case ScoreAction.SETSCORE_SUC :
            return {
                ...state,
                errMsg : "",
                msg : action.msg
            }
        case ScoreAction.SETSCORE_FAIL :
            return {
                ...state,
                errMsg : action.errMsg
            }
        default:
            return state;
    }
}