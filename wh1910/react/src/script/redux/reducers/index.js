// reduce   
// reducers   this.setState()  

// Store 收到 Action 以后，必须给出一个新的 State，
// 这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

// reducer 纯函数 

// 负责计算初始化的  state
import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP } from "../actions";

import {combineReducers} from "redux";
import {count} from "./count";
import {city} from "./city";
import {msg} from "./msg";
import {word} from "./word";
import {data} from "./data";

// import { CHANGECOUNT } from "../actions"
const defaultState = {
    count: 2020,
    city: "wuhan",
    msg: "how are you",
    word:"好好学习，天天向上",
    data:{
        mv:[],
        inp:"1910 ===奋斗...."
    }
}

export const reducers=combineReducers({
    count:count,
    num:count,
    msg:msg,
    word:word,
    data:data,
    city:city
})

// export const reducers = (state = defaultState, action) => {
//     console.log(action);
//     switch (action.type) {
//         case "countADD": state.count++; return state; break;
//         case "countDesc": state.count--; return state; break;
//         //state.count += action.payload; return state; break;
//         case CHANGECOUNT: return {...state,count:state.count+action.payload};break;

//         default:
//             return state;
//             break;
//     }
// }