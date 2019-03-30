export const ISLOGIN_TRUE = 'ISLOGIN_TRUE';
export const ISLOGIN_FAIL = 'ISLOGIN_FAIL';

import fetch from '../../common/fetch.jsx';
import { Host } from '../../config/host.jsx';
export function authorCheck() {
    return dispatch => {
        let options = {
            method: "GET",
            url: Host.prodHost.nodeHost + Host.hosts.authorCheck
        }
        fetch(options).then((data) => {
                if (data.ret) {
                    return dispatch(authorCheckSuc(data.data));
                } else {
                    return dispatch(authorCheckFail());
                }
            })
            .catch((error) => {
                return dispatch(authorCheckFail());
            })
    }
}

const authorCheckFail = () => {
    return {
        type : ISLOGIN_FAIL
    }
}

const authorCheckSuc = (data) => {
    return {
        type : ISLOGIN_TRUE,
        data : data
    }
}