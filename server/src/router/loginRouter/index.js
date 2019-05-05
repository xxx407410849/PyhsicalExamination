var express = require('express');
var Router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../../model/userModel');
var config = require('../../common/config');
/**
 * ret
 * false : 查找失败
 * 1 : 无用户存在
 * 2 : 密码通过
 * 3 : 密码错误
 */
Router.get('/', (req, res, next) => {
    res.send("hello,checker");
    next();

})
Router.post('/', (req, res, next) => {
    console.log(req.body);
    let { type, passWord, userName } = req.body;
    if (!type || !passWord || !userName) {
        res.send({
            errorCode: 1,
            errMsg: "请补全数据",
            status: 200,
            ret: false
        });
        next();
    }
    // User.create([
    //     {
    //         username : "lancelot.li",
    //         password : "18ae6c444e4b4f44ae613d294df4b9e791bb11083c3a929aa2c25d8a4e9de5bf",
    //         type : "admin"
    //     }
    // ]);
    // User.findOne({"username" : "lancelot.li"},(err,data)=>{
    //     console.log(data);
    // });
    User.findOne({ "username": userName, "type": type }, (err, data) => {
        var hmc = crypto.createHash('sha256', config.hmcKeyGen);
        passWord = hmc.update(passWord).digest('hex');
        console.log(passWord);
        if (err) {
            res.send({
                errorCode: 1,
                errMsg: "查找失败",
                status: 200,
                ret: false
            });
            next();
        }
        if (!data) {
            return res.send({
                errorCode: 0,
                errMsg: "账户不存在",
                status: 200,
                ret: false
            });
        }
        if (data.type != type) {
            return res.send({
                errorCode: -1,
                errMsg: "权限不足",
                status: 200,
                ret: false
            })
        }
        if (data.password === passWord) {
            let userData = {
                userName: data.username,
                type: data.type
            };
            req.session.userData = userData;
            res.send({
                errorCode: 0,
                errMsg: "",
                status: 200,
                ret: true,
                data: userData
            });
        } else {
            return res.send({
                errorCode: 0,
                errMsg: "密码错误",
                status: 200,
                ret: false
            });
        }
    });

});
Router.all('/out',(req,res,next)=>{
    req.session.userData = null;
    if(req.session.userData){
        return res.send({
            errorCode: 1,
            errMsg: "未清除登陆记录",
            status: 200,
            ret: false
        })
    }else{
        return res.send({
            errorCode: 0,
            errMsg: "",
            status: 200,
            ret: true
        })
    }
})

module.exports = Router;

