let mongoose = require('mongoose');
let config = require('../common/config');
mongoose.connect(config.mongodb);
//学生表
let StudentSchema = new mongoose.Schema({
    id : {
        type : String, //考生编号
        index : true,
        unique : true
    },
    examId : String, //考试分组编号
    name : String, //名称
    age : Number, //年龄
    sex : String, //性别
    tel : String, //联系电话
    unit : String, //送培单位
    score : [] //mixedArray
});
//创建User集合
var Student = mongoose.model('Student',StudentSchema);
//暴露接口
module.exports = Student;