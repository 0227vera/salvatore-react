const mongoose = require('mongoose')
// 连接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/salvatore'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})

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