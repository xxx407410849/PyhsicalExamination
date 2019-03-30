var express = require('express');
var Router = express.Router();
var User = require('../../model/userModel');
var crypto = require('crypto');
var config = require('../../common/config');
Router.get('/', (req, res, next) => {
    res.send("hello,checker");
});
Router.post('/', (req, res, next) => {
    let {
        type,
        passWord,
        userName,
        passWordF,
        passWordS
    } = req.body;
    var hmc = crypto.createHash('sha256', config.hmcKeyGen);
    passWord = hmc.update(passWord).digest('hex');

    if (!type || !passWord || !userName || !passWordF || !passWordS) {
        return res.send({
            ret: false,
            errMsg: "请检查信息是否填写完整"
        })
    }
    if (passWordF != passWordS) {
        return res.send({
            ret: false,
            errMsg: "新密码两次输入不一致"
        })
    }
    User.findOne({
        "username": userName,
        "type": type
    }, (err, data) => {
        if (!data) {
            return res.send({
                ret: false,
                errMsg: "账号不存在或账号非此用户类型"
            })
        }
        if (data.password === passWord) {
            hmc = crypto.createHash('sha256',config.hmcKeyGen);
            User.findByIdAndUpdate(data._id, {
                "password": hmc.update(passWordF).digest('hex')
            }, (err, data) => {
                if (err) {
                    return res.send({
                        ret: false,
                        errMsg: "数据库炸了"
                    })
                }
                return res.send({
                    ret: true,
                    errMsg: "修改成功"
                })
            });
        } else {
            return res.send({
                ret: false,
                errMsg: "密码错误"
            })
        }
    })
});

module.exports = Router;