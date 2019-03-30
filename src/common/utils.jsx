import fetch from './fetch.jsx';
import { Host } from '../config/host.jsx'
import md5 from 'js-md5'
export default {
    //url解析
    urlParse : (setUrl) => {
        let url = location.search;
        if(setUrl)url = setUrl.split('?')[1];
        let parseArray = {};
        url.replace("?","").split("&").forEach((data)=>{
            let key = data.split("=")[0];
            let value = data.split("=")[1];
            if(parseArray[key]){
                parseArray[key] = [...parseArray[key],value];
            }else{
                parseArray[key] = value;
            }
        });
        return parseArray;
    }
}