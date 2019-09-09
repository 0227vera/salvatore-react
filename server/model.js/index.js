const mongoose = require('mongoose')
// 连接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/salvatore'
mongoose.connect(DB_URL)

const models = {
  user:{
    userName: { type:String, require:true },
    userPass: { type:String, require:true },
    userType: { type:String, require:true },
    phone: { type:String, require:true },
    headImg: { type:String }, // 头像
    desc: { type:String }, // 个人简介
    title: { type:String }, // 职位简介
    company: { type:String }, // boss会多有的公司和给多少钱
    money:{ type: String } // 
  },
  chat:{
    chatid:{type:String,require:true},
    form:{type:String,require:true},
    to:{type:String,require:true},
    content:{type:String,require:true,default:''},
    create_time:{type:String,default:new Date().getTime()},
    read:{type:Boolean,default:false} // 这个状态只对to有效 
  }
}
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel(name){
    return mongoose.model(name)
  }
}