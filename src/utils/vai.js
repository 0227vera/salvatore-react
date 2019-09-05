// 校验函数
export default function vai(arr,obj) {
  let re = {
    pass:true,
    msg:''
  }
  arr = JSON.parse(JSON.stringify(arr)).reverse()
  arr.forEach(item => {
    if (!obj[item.id]) {
      re = {
        pass:false,
        msg:item.msg
      }
    }
  })
  return re
}