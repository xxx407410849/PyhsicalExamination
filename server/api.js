var express = require('express');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');
var config = require('./src/common/config');
//注册router
var indexRouter = require('./src/router/indexRouter/index');
var authorRouter = require('./src/router/authorRouter/index');
var loginRouter = require('./src/router/loginRouter/index');
var changeCodeRouter = require('./src/router/changeCodeRouter/index');
var examRouter = require('./src/router/examRouter/index');
var subRouter = require('./src/router/subRouter/index');
var stuRouter = require('./src/router/studentRouter/index');
var teacherRouter = require('./src/router/teacherRouter/index');
var airlineRouter = require('./src/router/airlineRouter/index');
var scoreRouter = require('./src/router/scoreRouter/index');
//配置
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
//连接数据库
app.use(session({
    secret: config.cookieSecret,
    key: config.db,
    store: new MongoStore({
        url: config.mongodb
    }),
    cookie: {
        maxAge: 60 * 1000 * 30
    },
    resave: false,
    saveUninitialized: true
}));
//跨域设置
app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://www.404lancelot.cn");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('X-Powered-By', 'lancelot');
    res.header('Access-Control-Allow-Credentials' , "true");
    //res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == "OPTIONS") {
        //加速options请求
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use('/author', authorRouter);
app.use('/login',loginRouter);
app.use('/changeCode',changeCodeRouter);
app.use('/exam',examRouter);
app.use('/sub',subRouter);
app.use('/stu',stuRouter);
app.use('/teacher',teacherRouter);
app.use('/score',scoreRouter);
app.use('/airline',airlineRouter);
app.get('/', (req, res) => {
    res.send("hello world");

})

const server = app.listen(config.apiPort, () => {
    console.log("start");
})