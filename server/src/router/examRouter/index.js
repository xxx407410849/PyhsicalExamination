var express = require('express');
var Router = express.Router();
var Exam = require('../../model/examModal.js');

Router.get('/',(req,res,next)=>{
    res.send("hello checker");
    next();
});
//存储
Router.post('/add',(req,res,next)=>{
    console.log(req.body);
});
//查询
Router.post('/',(req,res,next)=>{
    Exam.find({},(err,data)=>{
        console.log(data);
        if(err)return res.send({
            ret : false,
            err : "查询失败"
        })
        return res.send({
            ret : true,
            data : data || {}
        });
    })
});
module.exports = Router;
