var express = require('express');
var Router = express.Router();
var Teacher = require('../../model/teacherModal');
var User = require('../../model/userModel');
var config = require('../../common/config');
var crypto = require('crypto');
var md5 = require('js-md5');
var async = require('async');
Router.get('/get', (req, res, next) => {
    Teacher.find({
        "id": {
            $ne: "count"
        }
    }, {
        "_id": 0,
        "__v": 0,
        "num": 0
    }, (err, data) => {
        if (err) {
            return res.send({
                ret: false,
                errMsg: err.errmsg
            })
        } else {
            return res.send({
                ret: true,
                data: data
            })
        }
    })
});
let msg = {
    acceptNum: 0,
    rejectNum: 0,
    rejectMsg: []
};
const dealArray = (array, idx, res) => {
    if (idx === array.length) {
        return res.send({
            msg: msg,
            ret: true
        })
    } else {
        let item = array[idx];
        if (!item.name) {
            msg.rejectNum++;
            msg.rejectMsg.push(`第${idx + 1}行名字为空`);
            return dealArray(array, idx + 1, res);
        };
        if (item.id) {
            //如果拥有id与examId，则视为更改
            Teacher.findOne({
                "id": item.id
            }, (err, data) => {
                if (err) {
                    msg.rejectNum++;
                    msg.rejectMsg.push(`第${idx + 1}行修改失败`);
                    return dealArray(array, idx + 1, res);
                } else {
                    //防止返回空对象或者数组
                    if (data && data.length != 0) {
                        Teacher.update({
                            "id": item.id
                        }, {
                            ...item
                        }, (err, data) => {
                            if (err) {
                                msg.rejectNum++;
                                msg.rejectMsg.push(`第${idx + 1}行修改失败`);
                            } else {
                                msg.acceptNum++
                            }
                            return dealArray(array, idx + 1, res);
                        })
                    } else {
                        msg.rejectNum++;
                        msg.rejectMsg.push(`第${idx + 1}行修改失败，服务器无此教师数据或请勿自行添加修改教师编号`);
                        return dealArray(array, idx + 1, res);
                    }
                }
            })
        } else {
            console.log(item);
            Teacher.find({
                "id": "count"
            }, {
                id: 1,
                _id: 0,
                num: 1
            }, (err, ansData) => {
                //按照DF DM UF UM 排列，即 小于女 小于男 大于女 大于男
                if (err || !ansData) {
                    return res.send({
                        ret: false,
                        errMsg: "服务器错误，请先在数据库设置一个count值"
                    });
                }
                let teacherId = "T" + String(ansData[0].num + 1).padStart(3, "0");
                let teacher = new Teacher({
                    ...item,
                    id: teacherId
                });
                teacher.save((err, data) => {
                    if (err) {
                        msg.rejectNum++;
                        msg.rejectMsg.push(`第${idx + 1}行存储失败`);
                        return dealArray(array, idx + 1, res);
                    } else {
                        msg.acceptNum++;
                        var hmc = crypto.createHash('sha256', config.hmcKeyGen);
                        let password = hmc.update(md5(teacherId)).digest('hex');
                        let user = new User({
                            username: teacherId,
                            password: password,
                            type: "teacher"
                        });
                        user.save(()=>{
                            Teacher.update({
                                "id": "count"
                            }, {
                                $inc: {
                                    "num": 1
                                }
                            }, () => {
                                return dealArray(array, idx + 1, res);
                            });
                        });
                    }
                })
            })
        }
    }
}
Router.post('/import', (req, res, next) => {
    console.log(req.body);
    msg = {
        acceptNum: 0,
        rejectNum: 0,
        rejectMsg: []
    };
    dealArray(req.body, 0, res);
});

Router.post('/delete', (req, res, next) => {
    console.log(req.body);
    req.body.forEach((item, idx, array) => {
        Teacher.deleteOne({
            "id": item
        }, (err, data) => {
            User.deleteOne({
                "username": item
            }, () => {
                if (idx + 1 === array.length) {
                    res.send({
                        ret: true
                    })
                }
            })
        });
    })
});
module.exports = Router;