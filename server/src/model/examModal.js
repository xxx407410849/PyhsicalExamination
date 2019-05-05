let mongoose = require('mongoose');
let config = require('../common/config');
mongoose.connect(config.mongodb);
//考试分组
let ExamSchema = new mongoose.Schema({
    id : {
        type : String, 
        index : true,
        unique : true
    }, //编号
    name : String, //名称
    isSub : Boolean, //科目是否确定
    sub : {}, //详细科目
    isStudent : Boolean, //学生名单是否确定
    isScore : Boolean, //学生成绩是否确定
    ansNum : Number //学生计数
});
//创建User集合
var Exam = mongoose.model('Exam',ExamSchema);
//暴露接口
module.exports = Exam;