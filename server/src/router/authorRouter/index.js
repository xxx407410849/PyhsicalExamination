var express = require('express');
var crypto = require('crypto');
var Router = express.Router();
var jwt = require('../../common/jwt');
const JwtToken = jwt.JwtToken;
const JwtVerify = jwt.JwtVerify;


const keyWord = "lancelot.li";
Router.get('/',(req,res,next)=>{
    next();
})
Router.post('/check',(req,res,next)=>{
    let payload = {
        name : req.body.usrName,
        admin : true
    }
    let token = JwtToken(payload,keyWord,"1day",req.body.usrName);
    console.log(token);
    res.setHeader("access-Token",token);
    res.send({
        ret : true,
        data : {}
    });
})

module.exports = Router;