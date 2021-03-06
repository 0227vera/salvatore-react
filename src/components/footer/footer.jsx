import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
@withRouter
@connect(
  state => state.chat
)
class footer extends Component {
  render() {
    let footerList = this.props.data.filter(item => !item.hide)
    return (
      <footer>
        <TabBar>
          {footerList.map(item => (
            <TabBar.Item
              badge={item.path==='/msg'?this.props.unread:0}
              key={item.path}
              title={item.text}
              icon={{uri:require(`@/assets/img/footer/${item.path.slice(1)}.png`)}}
              selectedIcon={{uri:require(`@/assets/img/footer/${item.path.slice(1)}-active.png`)}}
              selected={this.props.location.pathname === item.path}
              onPress={
                () => {this.props.history.push(item.path)}
              }
            ></TabBar.Item>
          ))}
        </TabBar>
      </footer>
    )
  }
}
footer.propTypes = {
  data:PropTypes.array
}
export default footer
