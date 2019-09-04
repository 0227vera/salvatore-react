import React, { Component } from 'react'
import {Grid,WingBlank} from 'antd-mobile'
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
        <WingBlank>        
        {
          this.state.active > -1 ? 
          <div className="headImg-select">
            <span>选中的头像是：</span><img src={this.state.img} alt=""/>
          </div> : 
          <p className="headImg-select">请选择头像</p>
        }
        </WingBlank>
      </div>
    )
  }
}
