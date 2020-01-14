
// Store 就是保存数据的地方，你可以把它看成一个容器

// Redux 提供createStore这个函数，用来生成 Store。

// 当前时刻的 State，可以通过store.getState()拿到


import {createStore,applyMiddleware} from "redux";
import { reducers} from "./reducers"; 

import promise from "redux-promise";
import trunk from "redux-thunk";
const store=createStore(reducers,applyMiddleware(trunk,promise));  //fn
const state=store.getState();

export default store;