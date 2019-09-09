const express = require('express')
const context = 'react_app' // 定义上下文
// 添加上下文
let getUrl = url => `/${context}${url}`
const app = express()
// post数据请求中间键
const bodyParser = require('body-parser')
app.use(bodyParser.json())
// cookie的读写需要的中间键
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// 关于用户的接口
const userRouter = require('./user/index')
app.use(getUrl('/user'), userRouter)

// socket work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)


const model = require('./model.js/index')
const Chat = model.getModel('chat')

io.on('connection',socket => {
  // 听客户端的socket
  socket.on('sendmsg',data => {
    console.log(data)
    const { from, to, content } = data
    const chatid = [from,to].sort().join('_')
    console.log('---------->', from, to, content)
    Chat.create({chatid, from, to, content},(err,doc) => {
      console.log(doc)
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
  })
})


server.listen(3227, () => {
  console.log('node server running at: localhost:3227')
})

