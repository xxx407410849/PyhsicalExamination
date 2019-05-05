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
    examId : {type : String , default : ''}, //考试分组编号
    name : {type : String , default : ''}, //名称
    age : {type : Number , default : 0}, //年龄
    sex : {type : String , default : ''}, //性别
    tel : {type : String , default : ''}, //联系电话
    unit : {type : String , default : ''}, //送培单位
    score : {type : [] , default : ''}, //mixedArray -- 成绩
    cid : {type : String , default : ''}, //身份证
    type : {type : String , default : ''}, //学生类型（复或者初试）
    email : {type : String , default : ''} //邮箱
});
//创建User集合
var Student = mongoose.model('Student',StudentSchema);
//暴露接口
module.exports = Student;