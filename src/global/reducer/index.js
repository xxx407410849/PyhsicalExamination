import {
    ISLOGIN_FAIL,
    ISLOGIN_TRUE
} from '../action/index';
import ActionButton from 'antd/lib/modal/ActionButton';

let initState = {
    userName : "",
    type : ""
}
export default function globalReducer(state = initState,action){
    switch (action.type) {
        case ISLOGIN_FAIL:
            return {
                ...state
            }
        case ISLOGIN_TRUE:
            return {
                ...state,
                userName : action.data.userName,
                type : action.data.type
            }
        default:
            return state;
    }
} 