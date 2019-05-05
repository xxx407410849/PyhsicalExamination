var express = require('express');
var Router = express.Router();
var Exam = require('../../model/examModal.js');

Router.post('/add', (req, res, next) => {
    console.log(req.body);
    Exam.find({
        "id": req.body.class
    },(err,data)=>{
        if(err){
            return res.send({
                ret : false,
                errMsg : err.errmsg
            })
        }else{
            if(data && data.length != 0){
                let sub = {...data[0].sub , ...req.body.sub};
                Exam.update({
                    "id": req.body.class
                }, {
                    "sub": sub,
                    "isSub": true
                }, (err, data) => {
                    if (err) {
                        return res.send({
                            ret: false,
                            errMsg: err
                        })
                    } else {
                        return res.send({
                            ret: true
                        })
                    }
                });
            }else{
                return res.send({
                    ret : false,
                    errMsg : "无此班级信息"
                })
            }
        }
    });
});

module.exports = Router;