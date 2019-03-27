var express = require('express');
var Router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../../model/userModel');

var regusername = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,14}/;
var regpassword = /[a-zA-Z0-9^%&';=?$x22]{8,}/;

//老师注册密匙
const teacherKeyGen = "flyRegKeyGen";
//md5哈希值
const md5KeyGen = "md5FlyKeyGen";

/*errorCode 
0 : 表示没有error
1 : 表示无权限注册
2 : 表示账户名非法
3 : 表示密码非法
4 : 表示注册失败
5 : 表示账户名重复
*/

let initMessage = {
    status: 200,
    ret: "ok",
    error: "",
    errorCode: 0
}
const returnMessage = (msg = initMessage, res) => {
    res.send(msg);
}
Router.post('/', (req, res, next) => {
    let { type, username, code, keygen } = req.body;
    if (type === "teacher") {
        if (keygen && keygen != teacherKeyGen) return res.send({
            ...initMessage,
            error: "权限密匙错误",
            errorCode: 1
        });
    }
    if (!regusername.test(username)) {
        return res.send({
            ...initMessage,
            error: "账户名非法",
            errorCode: 2
        })
    }
    if(!regpassword.test(code)) {
        return res.send({
            ...initMessage,
            error: "密码非法",
            errorCode: 3
        })
    }
    var md5 = crypto.createHash(md5KeyGen);
    var password = md5.update(code).digest('base64');
    var user = new User({
        username : username,
        password : password,
        type : type
    });
    User.findOne({'username':username},()=>{

    })
})