const ajaxDefaluOptions = {
    url: '#',
    method: 'POST',
    async: true,
    timeout: 8000,
    data: null,
    dataType: 'text',
    header: {
        'Content-Type' : 'application/json;charset = utf-8'
    },
    onprogress: () => { },
    onuploadprogress: () => { },
    xhr: null
};

//公共data
const defaltData = {

};

export default (options) => {
    //合并默认值
    for (let i in ajaxDefaluOptions) {
        if (i === "async") options[i] = ( options[i] === false ? false : true );
        else options[i] = options[i] || ajaxDefaluOptions[i]
    }
    let xhr = options.xhr ? options.xhr : new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open(options.method, options.url, options.async);
        xhr.withCredentials = true;
        xhr.timeout = options.timeout;

        // 请求头
        for (let k in options.header) {
            xhr.setRequestHeader(k, options.header[k]);
        }
        // xhr.setRequestHeader('content-type','application/json');
        xhr.onprogress = options.onprogress;
        xhr.upload.onprogress = options.onuploadprogress;
        xhr.responeseType = options.dataType;
        xhr.onabort = () => {
            reject({
                errorType: 'abort_error',
                xhr: xhr
            });
        };
        xhr.ontimeout = () => {
            reject(new Error({
                errorType: 'timeout_error',
                xhr: xhr
            }))
        };
        xhr.onerorr = () => {
            reject(new Error({
                errorType: 'onerror',
                xhr: xhr
            }))
        };
        xhr.onloadend = () => {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error({
                    errorType: 'status_error',
                    xhr: xhr
                }))
            }
        };
        try {
            xhr.send(JSON.stringify(options.data));
        } catch (e) {
            reject({
                errorType: 'send_error',
                error: e
            })
        };
    })
}