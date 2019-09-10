import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WingBlank,List,Badge } from 'antd-mobile'
@connect(
  state => state
)
class msg extends Component {
  getLast(arr){
    return arr[arr.length-1]
  }
  render() {
    const userid = this.props.auth._id
    let chatGroup = {}
    this.props.chat.chatmsg.forEach(item => {
      chatGroup[item.chatid] = chatGroup[item.chatid] || []
      chatGroup[item.chatid].push(item)
    })
    console.log(Object.values(chatGroup))
    const chatList = Object.values(chatGroup).sort((a,b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    return (
      <WingBlank>
        <List>
          {
            chatList.map(item =>{
              let lastItem = this.getLast(item)
              let targetId = lastItem.from === userid ? lastItem.to:lastItem.from
              const unreadNum = item.filter(v => !v.read && v.to === userid).length
              return (
                <List.Item 
                  key={lastItem._id}
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`@/assets/img/headImg/icon${this.props.chat.users[targetId].headImg}.png`)}
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                  arrow="horizontal"
                >
                  {lastItem.content}
                  <List.Item.Brief>{this.props.chat.users[targetId].name}</List.Item.Brief>
                </List.Item>
              )
            }
            )
          }
        </List>
      </WingBlank>
    )
  }
}
export default msg
