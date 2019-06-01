let mongoose = require('mongoose');
let config = require('../common/config');
mongoose.connect(config.mongodb);
//成绩信息
let ScoreSchema = new mongoose.Schema({
    subName : String, //科目名字
    subSort : String, //科目序列
    examId : String, //班级id
    stuId : String, //学生id
    airline : String, //航空公司名
    stuName : String, //学生姓名
    calScore : Number, //计算后的成绩
    Score : String //计算前成绩
});
//创建User集合
var Score = mongoose.model('Score',ScoreSchema);
//暴露接口
module.exports = Score;