import React, { Component } from 'react'
import { List,InputItem } from 'antd-mobile'
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
    console.log(this.props.auth)
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
          <div>
            {this.props.chat.chatmsg.map(item => {
              if (item._id === this.props.match.params.userid) { // 这个是对方发的
                return <div key={item._id}>我给别人：{item.content}</div>
              } else {
                return <div key={item._id}>别人给我{item.content}</div>
              }
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
