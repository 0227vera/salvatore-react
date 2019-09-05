import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class userList extends Component {
  render() {
    let data = this.props.data
    console.log(data)
    return (
      <div>
        <WhiteSpace/>
        <WingBlank>
          {data.length ? 
            data.map(item => 
              <div  key={item._id}>
                <Card>
                    <Card.Header
                      title={item.userName}
                      thumb={require(`@/assets/img/headImg/icon${item.headImg}.png`)}
                      extra={<span>{item.title}</span>}
                    />
                    <Card.Body>
                    <div className="card-list-item">
                      {item.userType === 'boss' ? <p>公司:{item.company}</p> : null}
                      <p>电话:{item.phone}</p>
                      <p>薪资:{item.money}</p>
                      <p>个人简介:</p>
                      <ul>{item.desc.split('\n').map(text => <li key={text}>{text}</li>)}</ul>
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
userList.propTypes = {
  data:PropTypes.array
}
