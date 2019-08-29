// redux管理
const ADD = 'add-num'
const REDUCE = 'resuce-num'

// reduxer state的层面
export function counter(state = 10, action) {
  switch (action.type) {
    case ADD:
      return ++state
    case REDUCE :
      return --state
    default:
      return state
  }
}
// action的层面,用diapatch去触发
export function ADD_NUMBER () {
  return {type:ADD}
}
export function REDUCE_NUMBER () {
  return {type:REDUCE}
}

export function ADD_NUMBER_ASYNC () {
  return dispatch => {
    setTimeout(() => {
      dispatch(ADD_NUMBER())
    }, 2000);
  }
}




// // 新建store
// const store = createStore(counter)
// // 获取store
// // console.log(store.getState())

// // 事件派发dispatch
// store.dispatch({type:'add'})
// // console.log(store.getState())

// // 以上的部分会使代码冗余,推荐使用一下的事件订阅
// let listen = () => {
//   console.log('现在的store的状态为:', store.getState())
// }
// store.subscribe(listen)
// store.dispatch({type:'add'})

