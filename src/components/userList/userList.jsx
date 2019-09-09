import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
@withRouter
class userList extends Component {
  handleClick(item){
    this.props.history.push(`/chat/${item._id}`)
  }
  render() {
    let data = this.props.data
    return (
      <div>
        <WhiteSpace/>
        <WingBlank>
          {data.length ? 
            data.map(item => 
              <div  key={item._id}>
                <Card onClick={this.handleClick.bind(this,item)}>
                    <Card.Header
                      title={item.userName}
                      thumb={require(`@/assets/img/headImg/icon${item.headImg}.png`)}
                      extra={<span>{item.title}</span>}
                    />
                    <Card.Body>
                    <div className="card-list-item">
                      {item.userType === 'boss' ? <p><span>公司:</span> <b>{item.company}</b> </p> : null}
                      <p><span> 电话:</span> <b>{item.phone}</b> </p>
                      <p><span>薪资:</span> <b>{item.money}</b> </p>
                      <p><span> 个人简介:</span></p>
                      <ul>{item.desc.split('\n').map((text,index) => <li key={text+index}>{text}</li>)}</ul>
                    </div>
                    </Card.Body>
                </Card>
                <WhiteSpace/>
              </div>
              )
            : '暂无数据'}
        </WingBlank>
      </div>
    )
  }
}
export default userList
userList.propTypes = {
  data:PropTypes.array
}
