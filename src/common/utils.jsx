import fetch from './fetch.jsx';
import { Host } from '../config/host.jsx'
import md5 from 'js-md5'
export default {
    //权限控制
    authorCheck : (usrName,code) => {
        console.log(code);
        md5("lancelot");
        let hash = md5.create();
        let options = {
            url : Host.prodHost.nodeHost + Host.hosts.authorCheck,
            data : {
                usrName : usrName,
                code : hash.base64(hash.base64(String(code)))
            }
        }
        fetch(options).then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log("error",err);
        })
    }
}