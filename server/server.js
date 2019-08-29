const express = require('express')
const mongoose = require('mongoose')

// 连接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/salvatore'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})

// 定义数据库的文档类型
const User = mongoose.model('user', new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  age:{
    type:Number,
    required:true
  }
}))

// 增（create）删（remove）改（update）查（find,findOone）
User.create({
  name:'vare',
  age:25
},(err,doc) => {
  if (err) {
    console.log(err)
    return
  }
})

User.remove({name:'salvatore'},(err,doc) => {
  if (err) {
    console.log(err)
    return
  }
})

User.update({name:'vare'},{'$set':{age:18}},(err,doc) => {
  if (err) {
    console.log(err)
    return
  }
})

const app = express()

app.get('/', (req,res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/data', (req,res) => {
  User.findOne({name:'vare'},(err,doc) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(doc)
  })
})

app.listen(3227, () => {
  console.log('node server running at: localhost:3227')
})