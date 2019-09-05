import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SelectImg from "@/components/select-img/index"
import { NavBar, WingBlank, WhiteSpace, List, InputItem, TextareaItem, Button } from 'antd-mobile'
import {errorMsg} from '@/store/notice'
import { update } from '@/store/auth'
import {connect} from 'react-redux'
import vai from '@/utils/vai'

@connect(
  state => state.auth,
  {errorMsg,update}
)

class index extends Component {
  constructor(props){
    super(props)
    this.selectHeadImg = this.selectHeadImg.bind(this)
  }
  state = {
    showImg:'',
    headImg:'', // 头像信息
    desc:'', // 技能描述
    title:'', // 职位名称
    company:'', // 公司名称
    money:'' // 薪资范围
  }
  selectHeadImg(item) {
    this.setState({
      headImg:item.text,
      showImg:item.icon
    })
  }
  onChange(key,val) {
    this.setState({
      [key]:val
    })
  }
  save () {
    let arr = [{
      id:'headImg',
      msg:'请选择头像'
    },{
      id:'company',
      msg:'请填写公司名称'
    },{
      id:'title',
      msg:'请填写职位名称'
    },{
      id:'money',
      msg:'请填写薪资范围'
    },{
      id:'desc',
      msg:'请填写技能描述'
    }]
    let re = vai(arr,this.state)
    if (!re.pass) {
      this.props.errorMsg({msg:re.msg,msg_type:'warning'})
      return
    }
    this.props.update(this.state)
    console.log(this.props)
  }
  render() {
    const path = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    return (
      <div>
        {redirectTo && redirectTo !== path ? <Redirect to={redirectTo}></Redirect> : null}
        <NavBar mode="dark">信息完善</NavBar>
        <SelectImg selectHeadImg={this.selectHeadImg}></SelectImg>
        <WhiteSpace/>
        <WingBlank>
          <List>
            <List.Item>
              所选头像
              <img src={this.state.showImg} style={{marginLeft:20}} alt=""/>
            </List.Item>
            <InputItem
              placeholder="请输入公司名称"
              value={this.state.company}
              onChange={v=>this.onChange('company',v)}
              clear
            >
              公司名称
            </InputItem>
            <InputItem
              placeholder="请输入所需职位"
              value={this.state.title}
              onChange={v=>this.onChange('title',v)}
              clear
            >
              职位名称
            </InputItem>
            <InputItem
              placeholder="请输入薪资范围（K）"
              value={this.state.money}
              onChange={v=>this.onChange('money',v)}
              clear
            >
              薪资范围
            </InputItem>
            <TextareaItem
            placeholder="请输入必要技能"
            value={this.state.desc}
            onChange={v=>this.onChange('desc',v)}
            clear
            autoHeight
            data-seed="logId"
            title="技能描述"
            rows={2}
            />
          </List>
          <WhiteSpace/>
          <Button type="primary" onClick={this.save.bind(this)}>保存</Button>
        </WingBlank>
      </div>
    )
  }
}
export default index