// Action 就是 View 发出的通知，表示 State 应该要发生变化   通知 store 

// Action 是一个对象。其中的type属性是必须的  payload

// 改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

// store.dispatch接受一个 Action 对象作为参数，将它发送出去。


import {axios} from "&"

export const countDesc={
    type:"countDesc"
}
export const CHANGECOUNT = "changeCount12231321"   // 常量  方便后期维护
export const changeCount=(payload)=>{
   return {
      type:CHANGECOUNT,
      payload
   }
}



export const CHANGCITY="changeCity"
export function changeCity(payload){
   return{
      type:CHANGCITY,
      payload
   }
}

export const CHANGEMSG = "changeMsg"
export function changeMsg(payload){
   return{
      type:CHANGEMSG,
      payload
   }
}


export const CHANGEWORD  = "changeWord";
export const changeWord=payload=>(
   {
    type:CHANGEWORD,  
    payload
   }
)

export const CHANGEINP = "changeInp"
export const changeInp = payload =>(
    {
        type:CHANGEINP,
        payload
    }
)

// async + await 
// async 表明 函数内 有 一个 promise 内置对象
// await 必须等我执行完成  才能执行下一步

export async function changeMvAsync({url}){
   const res=await axios.get(url)
   console.log(res)
    return {
        type:'changeMvAsync',
        payload: res.data.result.data
    }
}
