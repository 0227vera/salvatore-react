import React, { Component } from 'react'
import SelectImg from "@/components/select-img/index"
import {NavBar} from 'antd-mobile'

export default class index extends Component {
  constructor(props){
    super(props)
    this.selectHeadImg = this.selectHeadImg.bind(this)
  }
  selectHeadImg(item) {
    // console.log(item)
  }
  render() {
    return (
      <div>
        <NavBar mode="dark">BOSS页面完善</NavBar>
        <SelectImg selectHeadImg={this.selectHeadImg}></SelectImg>
      </div>
    )
  }
}
