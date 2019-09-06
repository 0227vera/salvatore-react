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

io.on('connection',socket => {
  // 听客户端的socket
  socket.on('sendmsg',data => {
    // 向全局广播
    io.emit('recvmsg',data)
  })
})


server.listen(3227, () => {
  console.log('node server running at: localhost:3227')
})

