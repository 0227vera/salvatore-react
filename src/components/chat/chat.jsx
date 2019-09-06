import React, { Component } from 'react'
import { List,WingBlank,InputItem } from 'antd-mobile'
import io from 'socket.io-client'
const socket = io('ws://localhost:3227')


export default class chat extends Component {
  constructor(props){
    super(props)
    this.state = {
      text:'',
      msg:[]
    }

  }
  componentDidMount(){
    socket.on('recvmsg',data => {
      this.setState({msg:[...this.state.msg,data]})
      console.log(this.state.msg)
    })
  }
  handleSubmit() {
    socket.emit('sendmsg',{text:this.state.text})
    this.setState({text:''})
  }
  render() {
    console.log(this.props.match.params.userName)
    return (
      <div>
          <div></div>
          <div style={{position:'fixed',bottom:0,width:'100%',boxSizing:'border-box'}}>
            <List>
              <List.Item extra={ <span onClick={this.handleSubmit.bind(this)}>发送</span> }>
                <InputItem 
                  placeholder="请输入"
                  value={this.state.text} 
                  onChange={ v => {this.setState({text: v})} } />
              </List.Item>
            </List>
          </div>
      </div>
    )
  }
}
