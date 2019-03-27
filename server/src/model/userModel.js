let mongoose = require('mongoose');
let config = require('../common/config');
mongoose.connect(config.mongodb);

let UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	type:String
});
//创建User集合
var User = mongoose.model('User',UserSchema);
//暴露接口
module.exports = User;