var express = require('express');
var Router = express.Router();
var Exam = require('../../model/examModal.js');
// Router.get('/',(req,res,next)=>{
//     res.send("hello checker");
//     next();
// });
//存储
let checkError = false;
const subArray = [{
        "科目一": "BMI指数",
        "科目三": "仰卧收腹举腿",
        "科目四": "3000米跑",
        "科目六": "平衡垫测试"
    },
    {
        "科目一": "BMI指数",
        "科目三": "仰卧收腹举腿",
        "科目五": "1500m跑",
        "科目七": "平衡垫测试"
    },
    {
        "科目一": "BMI指数",
        "科目三": "仰卧收腹举腿",
        "科目四": "1500米跑",
        "科目六": "平衡垫测试"
    },
    {
        "科目一": "BMI指数",
        "科目三": "仰卧收腹举腿",
        "科目五": "3000米跑",
        "科目七": "平衡垫测试"
    }
]
Router.post('/add', (req, res, next) => {
    let {
        year,
        round
    } = req.body;
    checkError = false;
    for (let i = 0; i < 4; i++) {
        let arrayId = "EC" + year + round;
        let str = arrayId + (i % 2 === 0 ? "U" : "D");
        let name = "35岁" + (i % 2 === 0 ? "以上" : "以下");
        let sub = subArray[i];
        if (i === 0 || i === 3) {
            str = str + "M";
            name = `${year}年第${round}次${name}男`;
        } else {
            str = str + "F";
            name = `${year}年第${round}次${name}女`;
        }
        name = name + (i % 2 === 0 ? "定期训练班" : "初定期训练班");
        let exam = new Exam({
            id: str,
            name: name,
            isSub: false,
            sub: sub,
            isStudent: false,
            isScore: false,
            ansNum: 0
        });
        var regExam = `/^${arrayId}[\S]{2}$/`;
        regExam = eval(regExam);
        exam.save((err, data) => {
            if (err) {
                if (!checkError) {
                    checkError = true;
                    if (err.code === 11000) {
                        return res.send({
                            ret: false,
                            errMsg: "已经存在该批次班级"
                        });
                    } else {
                        return res.send({
                            ret: false,
                            errMsg: "服务器错误"
                        })
                    }
                }
            } else {
                console.log(i);
                if (i === 3) {
                    console.log(111);
                    return res.send({
                        ret: true,
                        errMsg: ""
                    })
                }
            }
        });
    }

});
//查询
Router.get('/', (req, res, next) => {
    Exam.find({}, {
        "id": 1,
        "name": 1,
        "isSub": 1,
        "isStudent": 1,
        "isScore": 1,
        "_id": 0
    }, (err, data) => {
        if (err) return res.send({
            ret: false,
            errMsg: "查询失败"
        })
        return res.send({
            ret: true,
            data: data || {}
        });
    })
});
//删除
Router.post('/delete', (req, res, next) => {
    let {
        key
    } = req.body;
    var regExam = `/^${key}[\\S]{2}$/g`;
    regExam = eval(regExam);
    Exam.find({
        "id": {
            $regex: regExam
        }
    }, (err, data) => {
        let checkDelete = true; //默认可以删除
        if (data) {
            data.forEach((data, idx) => {
                if (data.isSub || data.isStudent || data.isScore) return checkDelete = false;
            })
        }
        if (checkDelete) {
            Exam.remove({
                "id": {
                    $regex: regExam
                }
            }, (err, data) => {
                if (err) {
                    return res.send({
                        ret: false,
                        errMsg: err.errmsg
                    })
                } else {
                    return res.send({
                        ret: true
                    })
                }
            });
        } else {
            return res.send({
                ret: false,
                errMsg: "该批次不可删除"
            })
        }
    })
});
//名字表
Router.get('/name', (req, res, next) => {
    Exam.find({
        "isSub": false
    }, {
        "id": 1,
        "name": 1,
        "_id": 0
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
//批次表
Router.get('/round', (req, res, next) => {
    Exam.find({}, {
        "id": 1,
        "_id": 0
    }, (err, data) => {
        let roundArray = {};
        if (err) {
            return res.send({
                errMsg: err.msg,
                ret: false
            })
        } else {
            data.forEach((item, idx) => {
                let key = item.id.slice(2, -2);
                let year = key.slice(0, 4);
                let round = key.slice(4);
                let name = `${year}年第${round}批`;
                if (!roundArray[key]) {
                    roundArray[key] = name;
                }
            });
            let dataArray = [];
            for (const key in roundArray) {
                dataArray.push({
                    key: key,
                    name: roundArray[key]
                })
            }
            res.send({
                ret: true,
                data: dataArray
            })
        }

    })
});
//科目表
Router.get('/sub', (req, res, next) => {
    Exam.find({}, {
        "id": 1,
        "name": 1,
        "sub": 1,
        "_id": 0
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
})
module.exports = Router;