var express = require('express');
var Router = express.Router();
var Student = require('../../model/studentModal');
var Exam = require('../../model/examModal');
var Score = require('../../model/scoreModal');
var User = require('../../model/userModel');
var async = require('async');
var config = require('../../common/config');
var crypto = require('crypto');
var md5 = require('js-md5');

Router.post('/get', (req, res, next) => {
    console.log(req.body);
    let {
        key
    } = req.body;
    let findKey = `EC${key}`;
    var regExam = `/^${findKey}[\\S]{2}$/g`;
    regExam = eval(regExam);
    Student.find({
        "examId": {
            $regex: regExam
        }
    }, {
        "score": 0,
        "_id": 0,
        "__v": 0
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
const dealArray = (array, idx, findKey, res) => {
    if (idx === array.length) {
        return res.send({
            msg: msg,
            ret: true
        })
    } else {
        let item = array[idx];
        if (!item.age || !item.sex || !item.name || !item.type) {
            msg.rejectNum++;
            msg.rejectMsg.push(`第${idx + 1}行性别或年龄或名字或类型为空`);
            return dealArray(array, idx + 1, findKey, res);
        };
        if (!(item.type === "复训" || item.type === "初训")) {
            msg.rejectNum++;
            msg.rejectMsg.push(`第${idx + 1}行请设置为“复训”或者“初训”`);
            return dealArray(array, idx + 1, findKey, res);
        };
        if (item.age > 35 && item.type === "初训") {
            msg.rejectNum++;
            msg.rejectMsg.push(`第${idx + 1}行35岁以上只存在初训班`);
            return dealArray(array, idx + 1, findKey, res);
        };
        if (item.id && item.examId) {
            //如果拥有id与examId，则视为更改
            Student.findOne({
                "id": item.id,
                "examId": item.examId
            }, (err, data) => {
                if (err) {
                    msg.rejectNum++;
                    msg.rejectMsg.push(`第${idx + 1}行修改失败`);
                    return dealArray(array, idx + 1, findKey, res);
                } else {
                    //防止返回空对象或者数组
                    if (data && data.length != 0) {
                        if (data.sex != item.sex || data.age != item.age) {
                            //修改性别和年龄的情况
                            msg.rejectNum++;
                            msg.rejectMsg.push(`第${idx+1}行修改失败,若需修改考生年龄和性别，请删除该考生后再添加`);
                            return dealArray(array, idx + 1, findKey, res);
                        }
                        Student.update({
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
                            return dealArray(array, idx + 1, findKey, res);
                        })
                    } else {
                        msg.rejectNum++;
                        msg.rejectMsg.push(`第${idx + 1}行修改失败，服务器无此考生数据或请勿自行添加修改考生编号和班级编号，若需修改性别年龄，请先删除该考生再添加`);
                        return dealArray(array, idx + 1, findKey, res);
                    }
                }
            })
        } else if (item.examId) {
            //无id且有examId
            // var regExam = /^EC[\d]{5,6}[\S]{2}$/g;
            // //检测合法性
            // if(regExam.test(item.examId)){
            msg.rejectNum++;
            msg.rejectMsg.push(`第${idx + 1}行examId请置空，请参照操作须知`)
            return dealArray(array, idx + 1, findKey, res);
        } else {
            console.log(item);
            let examId = findKey + (item.age > 35 ? "U" : "D") + (item.sex === "男" ? "M" : "F");
            let key = (item.age > 35 ? (item.sex === "男" ? 3 : 2) : (item.sex === "男" ? 1 : 0));
            var regExam = `/^${findKey}[\\S]{2}$/g`;
            regExam = eval(regExam);
            Exam.find({
                "id": {
                    $regex: regExam
                }
            }, {
                id: 1,
                _id: 0,
                ansNum: 1
            }, (err, examData) => {
                //按照DF DM UF UM 排列，即 小于女 小于男 大于女 大于男
                if (err || !examData) {
                    return res.send({
                        ret: false,
                        errMsg: "批次错误"
                    });
                }
                let stuId = "S" + examId + String(examData[key].ansNum + 1).padStart(3, "0");
                let student = new Student({
                    ...item,
                    id: stuId,
                    examId: examId
                });
                student.save((err, data) => {
                    if (err) {
                        msg.rejectNum++;
                        msg.rejectMsg.push(`第${idx + 1}行存储失败`);
                        return dealArray(array, idx + 1, findKey, res);
                    } else {
                        msg.acceptNum++;
                        var hmc = crypto.createHash('sha256', config.hmcKeyGen);
                        let password = hmc.update(md5(stuId)).digest('hex');
                        let user = new User({
                            username: stuId,
                            password: password,
                            type: "student"
                        });
                        user.save(() => {
                            Exam.update({
                                "id": examId
                            }, {
                                $inc: {
                                    "ansNum": 1
                                }
                            }, () => {
                                return dealArray(array, idx + 1, findKey, res);
                            });
                        })
                    }
                })
            })
        }
    }
}
Router.post('/import', (req, res, next) => {
    msg = {
        acceptNum: 0,
        rejectNum: 0,
        rejectMsg: []
    };
    let {
        data,
        round
    } = req.body;
    let findKey = `EC${round}`;
    var regExam = `/^${findKey}[\\S]{2}$/g`;
    regExam = eval(regExam);
    Exam.find({
        "id": {
            $regex: regExam
        }
    }, {
        id: 1,
        _id: 0,
        ansNum: 1
    }, (err, examData) => {
        //按照DF DM UF UM 排列，即 小于女 小于男 大于女 大于男
        if (err || !examData) {
            return res.send({
                ret: false,
                errMsg: "批次错误"
            });
        }
        Exam.updateMany({
            "id": {
                $regex: regExam
            }
        }, {
            "isStudent": true
        }, (err) => {
            if (err || !examData) {
                return res.send({
                    ret: false,
                    errMsg: "批次错误"
                });
            }
            //递推强行变更操作为同步
            dealArray(data, 0, findKey, res);
        })
    })
});

Router.post('/delete', (req, res, next) => {
    console.log(req.body);
    req.body.forEach((item, idx, array) => {
        Student.deleteOne({
            "id": item
        }, (err, data) => {
            //联结删除
            User.deleteOne({
                "username": item
            }, () => {
                Score.deleteMany({
                    stuId: item
                }, (err, data) => {
                    if (idx + 1 === array.length) {
                        res.send({
                            ret: true
                        })
                    }
                });
            });
        });
    })
});
Router.get('/id', (req, res, next) => {
    Student.find({}, {
        "id": 1,
        "_id": 0,
        "name": 1
    }, (err, data) => {
        if (err) {
            res.send({
                ret: false,
                errMsg: err.errmsg
            });
        } else {
            res.send({
                ret: true,
                data: data
            })
        }
    });
});
Router.post('/info', (req, res, next) => {
    Student.findOne({
        "id": req.body.key
    }, {
        "_id": 0,
        "__v": 0
    }, (err, data) => {
        if (err) {
            res.send({
                ret: false,
                errMsg: err.errmsg
            });
        } else {
            res.send({
                ret: true,
                data: data
            })
        }
    })
});
module.exports = Router;