import React, { Component } from 'react'
import {Grid} from 'antd-mobile'
import PropTypes from 'prop-types'
let data = Array.from(new Array(48)).map((item,index) => ({icon:require(`../../assets/img/headImg/icon${index}.png`),text:index}))
export default class index extends Component {
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
    this.state = {
      active: -1,
      img:''
    }
  }
  onClick(item){
    this.setState({
      active:+item.text,
      img:item.icon
    })
    this.props.selectHeadImg(item)
  }
  render() {
    return (
      <div>
        <Grid 
        data={data} 
        activeStyle={true}
        isCarousel
        carouselMaxRow={3}
        onClick={this.onClick}
        />
      </div>
    )
  }
}
index.propTypes = {
  selectHeadImg:PropTypes.func
}
