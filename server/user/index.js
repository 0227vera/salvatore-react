const express = require('express')
const model = require('../model.js/index')
const userRouter = express.Router()
const User = model.getModel('user')
const utility = require('utility')
let getComplexMd5 = pwd => utility.md5(utility.md5(`qfanjlfh@234#$#_@$*&dfaas24dfa${pwd}_qfanjlataetast2436245asdfas24dfa`))


// 个人信息
userRouter.get('/info', (req,res) => {
  const userid = req.cookies.userid
  if (!userid) return res.json({success:false,msg:'未登录'})
  User.findOne({_id:userid},{userPass:0}, (err,doc) => {
    if (err) return res.json({success:false,msg:'数据库查询失败'})
    return res.json({success:true,data:doc})
  })
})

// 数据清空
userRouter.get('/delete', (req,res) => {
  User.remove({},(err,doc) => {
    if (err) return res.json({success:false,msg:err})
    return res.json({success:true,data:'删除成功'})
  })
})


// 登陆
userRouter.post('/login', (req,res) => {
  let {userName,userPass} = req.body
  // 返回前端数据过滤掉密码
  User.findOne({userName,userPass:getComplexMd5(userPass)},{userPass:0}, (err,doc) => {
    if (err) return res.json({success:false,msg:'数据查询出错'})
    if (doc) return res.json({success:true,data:doc})
    // 存储cookie记录登陆装填
    res.cookie('userid', doc._id)
    return res.json({success:false,msg:'用户不存在或者密码错误'})
  })
})

// 注册
userRouter.post('/register', (req,res) => {
  let {userName, userPass, userType, phone} = req.body
  User.findOne({userName,userType}, (err,doc) => {
    if (err) return res.json({success:false,msg:'数据库错误'})
    if (doc) return res.json({success:false,msg:'已存在该名称的用户'})
    const userModel = new User({userName, userPass:getComplexMd5(userPass), userType, phone})
    userModel.save((err,doc) => {
      if (err) return res.json({success:false,msg:'写入数据库错误'})
      let {userName,userType,_id,phone} = doc
      res.cookie("userid",_id)
      return res.json({success:true,data:{userName,userType,_id,phone}})
    })
  })
})
module.exports = userRouter