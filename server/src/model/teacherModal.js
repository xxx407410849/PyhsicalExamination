let mongoose = require('mongoose');
let config = require('../common/config');
mongoose.connect(config.mongodb);
//学生表
let TeacherSchema = new mongoose.Schema({
    id : {
        type : String,
        index : true,
        unique : true
    }, //教师编号
    examId : String, //考试分组编号
    name : String, //名称
    age : Number, //年龄
    sex : String, //性别
    tel : String, //联系电话
    address : String, //送培单位
    email : String //邮箱
});
//创建User集合
var Teacher = mongoose.model('Teacher',TeacherSchema);
//暴露接口
module.exports = Teacher;