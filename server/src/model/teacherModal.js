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
    name : String, //名称
    tel : {type : String , default : ''}, //联系电话
    address : {type : String , default : ''}, //联系地址
    email : {type : String , default : ''}, //邮箱
    num : {type : Number , default : 0} //仅作为计数用
});
//创建User集合
var Teacher = mongoose.model('Teacher',TeacherSchema);
//暴露接口
module.exports = Teacher;