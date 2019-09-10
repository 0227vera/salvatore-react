import React, { Component } from 'react'
import { List,InputItem, WingBlank, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg,recvMsg } from '@/store/chat'
import { getChatId } from '@/utils/getChatId'
const emoji = require('emoji')
@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg } 
)
class chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      content:'',
      showEmoji:false,
      msg:[]
    }
  }
  componentDidMount(){
    if (this.props.chat.chatmsg.length === 0){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  fixCarousel(){
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }
  handleSubmit() {
    this.props.sendMsg({
      from:this.props.auth._id, // 自己
      to:this.props.match.params.userid, // 在地址上的数据
      content:this.state.content// 是什么
    })
    this.setState({content:''})
  }
  onLeftClick(){
    this.props.history.goBack()
  }
  render() {
    const userid = this.props.match.params.userid
    const users = this.props.chat.users
    let chatmsgs = this.props.chat.chatmsg.filter(item => item.chatid === getChatId(userid,this.props.auth._id))
    if (!users[userid]) {
      return null
    }
    let emojiData=[]
    for(let text in emoji.EMOJI_MAP) emojiData.push({text})
    return (
      <div id="chat">
          <div className="navbar">
            <NavBar 
              mode="dark"
              leftContent={ <Icon type="left" />}
              onLeftClick={this.onLeftClick.bind(this)}
            >
              {users[userid].name}
            </NavBar>
          </div>
          <div className="content" style={{paddingBottom:this.state.showEmoji?60+46*6:60}}>
            <WingBlank>
              {chatmsgs.map(item => {
                let imgUrl = require(`@/assets/img/headImg/icon${users[item.from].headImg}.png`)
                return item.from === userid ?
                (
                  <List key={item._id}>
                    <List.Item
                      thumb={imgUrl}
                      multipleLine
                      wrap
                      className="chat-other"
                    >
                      {item.content}
                    </List.Item>
                  </List>
                ) :
                (
                  <List key={item._id}>
                    <List.Item
                      extra={<img src={imgUrl} /> }
                      multipleLine
                      wrap
                      className="chat-me"
                    >
                      {item.content}                 
                    </List.Item>
                  </List>
                )
              }
                
              )}
            </WingBlank>
          </div>
          <div style={{position:'fixed',bottom:0,width:'100%',boxSizing:'border-box',zIndex:99}}>
            <List>
              <List.Item
                extra={
                  <div>
                    <span style={{marginRight:10}} onClick={() => {this.fixCarousel();this.setState({showEmoji:!this.state.showEmoji})}}>😍</span>
                    <span onClick={this.handleSubmit.bind(this)}>发送</span> 
                  </div>
                }
              >
                <InputItem 
                  placeholder="请输入"
                  value={this.state.content} 
                  onChange={ v => {this.setState({content: v})} } />
              </List.Item>
            </List>
            {
              this.state.showEmoji ? 
              <Grid
                data={emojiData}
                columnNum={9}
                isCarousel
                carouselMaxRow={4}
                onClick={el => {
                  console.log(el)
                  this.setState({
                    content:this.state.content+el.text
                  })
                }}
              />:null
            }
            
          </div>
      </div>
    )
  }
}

export default chat
