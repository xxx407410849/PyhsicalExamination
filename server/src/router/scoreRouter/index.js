var express = require('express');
var Router = express.Router();
var Score = require('../../model/scoreModal');
var Exam = require('../../model/examModal');
var Student = require('../../model/studentModal');
var async = require('async');
var cal = require('../../common/calScore');
let countScore = 0;
let scoreArray = [];
const dealScoreArray = (array, idx, length, res) => {
    countScore++;
    scoreArray = [...array, ...scoreArray];
    // if(array.length === 0){

    // }
    if (countScore === length) {
        res.send({
            ret: true,
            data: scoreArray
        })
    }
}
Router.post('/get', (req, res, next) => {
    //每一次查询都检查是否生成完整的成绩联结数据,防止学生数据被修改
    let {
        key
    } = req.body;
    countScore = 0;
    scoreArray = [];
    Exam.findOne({
        "id": key
    }, (err, examData) => {
        if (err) {
            return res.send({
                ret: false,
                errMsg: err.errmsg
            })
        }
        if (!(examData.isSub && examData.isStudent)) {
            return res.send({
                ret: false,
                errMsg: "该批次尚未确定科目和学生，请联系相关负责人"
            })
        } else {
            Student.find({
                "examId": key
            }, (err, stuData) => {
                if (err) {
                    return res.send({
                        ret: false,
                        errMsg: err.errmsg
                    })
                } else {
                    if (stuData && stuData.length != 0) {
                        let stuLength = stuData.length;
                        stuData.forEach((item, idx) => {
                            Score.find({
                                "stuId": item.id
                            }, {
                                "_id": 0,
                                "__v": 0
                            }, (err, scoreData) => {
                                if (err) {
                                    console.log(err.errmsg);
                                    dealScoreArray([], idx, stuLength, res)
                                } else {
                                    //如果拥有data则表示该学生已经设置成绩
                                    if (scoreData && scoreData.length != 0) {
                                        dealScoreArray(scoreData, idx, stuLength, res);
                                    } else {
                                        let ScoreDataMake = [];
                                        for (const examKey in examData.sub) {
                                            let saveScoreData = {
                                                subName: examData.sub[examKey], //科目名字
                                                subSort: examKey, //科目序列
                                                examId: key, //班级id
                                                stuId: item.id, //学生id
                                                stuName: item.name, //学生姓名
                                                calScore: -1, //计算后的成绩
                                                Score: -1 //计算前成绩
                                            }
                                            let score = new Score(saveScoreData);
                                            score.save();
                                            ScoreDataMake.push(saveScoreData);
                                        }
                                        dealScoreArray(ScoreDataMake, idx, stuLength, res);
                                    }
                                }
                            })
                        });
                    } else {
                        return res.send({
                            ret: false,
                            errMsg: "该批次学生为空，请联系相关负责人"
                        })
                    }
                }
            })
        }
    });
});
let msg = {
    acceptNum: 0,
    rejectNum: 0,
    rejectMsg: []
};
let countUploadScore = 0;
const dealUploadMsg = (errMsg, length, res) => {
    countUploadScore++;
    if (errMsg) {
        msg.rejectNum++;
        msg.rejectMsg.push(errMsg);
    } else {
        msg.acceptNum++;
    }
    if (countUploadScore === length) {
        res.send({
            ret: true,
            msg: msg
        })
    }
}
Router.post('/import', (req, res, next) => {
    let {
        key,
        data
    } = req.body;
    msg = {
        acceptNum: 0,
        rejectNum: 0,
        rejectMsg: []
    };
    countUploadScore = 0;
    Exam.findOne({
        "id": key
    }, (err, examData) => {
        if (err) {
            return res.send({
                ret: false,
                errMsg: err.errmsg
            })
        } else {
            if (!examData || !(examData.isSub && examData.isStudent)) {
                return res.send({
                    ret: false,
                    errMsg: "考核班级错误或者该班级基础数据设置未完成"
                })
            } else {
                let dataLength = data.length;
                data.map((item, idx) => {
                    Score.findOne({
                        "examId": item.examId,
                        "stuId": item.stuId,
                        "subName": item.subName,
                        "subSort": item.subSort
                    }, (err, scoreData) => {
                        if (err) {
                            console.log(err);
                            return dealUploadMsg(`第${idx + 1}行查找失败`, dataLength, res);
                        } else {
                            if (scoreData) {
                                //查找到数据，则代表是更新操作
                                cal.calScore(item.stuId, item.Score, item.subName, (err, resScore) => {
                                    if (err) {
                                        return dealUploadMsg(`第${idx + 1}行更新失败,原因：${err}`, dataLength, res);
                                    } else {
                                        Score.update({
                                            "examId": item.examId,
                                            "stuId": item.stuId,
                                            "subName": item.subName,
                                            "subSort": item.subSort
                                        }, {
                                            ...item,
                                            calScore: resScore
                                        }, (err, data) => {
                                            if (err) {
                                                console.log(err);
                                                return dealUploadMsg(`第${idx + 1}行更新失败`, dataLength, res);
                                            } else {
                                                return dealUploadMsg(null, dataLength, res);
                                            }
                                        })
                                    }
                                })
                            } else {
                                //未查找到数据，则代表是错误操作
                                return dealUploadMsg(`第${idx + 1}行，请保证学生id和班级id以及项目名及序列皆保持不变`, dataLength, res);
                            }
                        }
                    })
                })
            }
        }
    })
});
Router.post('/stu',(req,res,next)=>{
    let {key} = req.body;
    Score.find({stuId : key},{"_id" : 0 , "__v" : 0},(err,data)=>{
        if(err){
            res.send({
                ret : false,
                errMsg : "查找失败"
            })
        }else{
            if(data && data.length != 0){
                res.send({
                    ret : true,
                    data : data
                })
            }else{
                res.send({
                    ret : false,
                    errMsg : "该学生所在班级基础数据未设置完全或成绩表未初始化或该学生不存在"
                })
            }
        }

    })
})
module.exports = Router;