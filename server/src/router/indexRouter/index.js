var express = require('express');
var Router = express.Router();
Router.get('/',(req,res,next)=>{
    next();
})
Router.get('/check',(req,res,next)=>{
    console.log(req);
    res.send(111);
})

module.exports = Router;