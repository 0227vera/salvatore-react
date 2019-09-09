import React, { Component } from 'react'
import { List,InputItem,WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg,recvMsg } from '@/store/chat'
@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg } 
)
class chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      content:'',
      msg:[]
    }

  }
  componentDidMount(){
    this.props.getMsgList()
    this.props.recvMsg()
  }
  handleSubmit() {
    this.props.sendMsg({
      from:this.props.auth._id, // 自己
      to:this.props.match.params.userid, // 在地址上的数据
      content:this.state.content// 是什么
    })
    this.setState({content:''})
  }
  render() {
    return (
      <div>
          <div className="chat">
            {this.props.chat.chatmsg.map(item => {
              return item.from === this.props.match.params.userid ?
              (
                <div key={item._id} className="chat-left chat-common">
                  <div className="chat-left-item chat-common-item">
                    <img src="" alt=""/>
                    <span>别人给我的：   {item.content}</span>
                  </div>
                </div>
              ) :
              (
                <div key={item._id} className="chat-right chat-common">
                  <div className="chat-right chat-common-item">
                    <span>我给别人的:   {item.content}</span>
                    <img src="" alt=""/>
                  </div>
                </div>
              )
            }
              
            )}
          </div>
          <div style={{position:'fixed',bottom:0,width:'100%',boxSizing:'border-box'}}>
            <List>
              <List.Item extra={ <span onClick={this.handleSubmit.bind(this)}>发送</span> }>
                <InputItem 
                  placeholder="请输入"
                  value={this.state.content} 
                  onChange={ v => {this.setState({content: v})} } />
              </List.Item>
            </List>
          </div>
      </div>
    )
  }
}

export default chat
