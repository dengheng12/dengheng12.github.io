import React from "react";
import ReactDOM from "react-dom";
import CounterDemo from "./components"
import store from "./store"


export default class ReduxDemo extends React.Component {
    
    render() {
        const value=store.getState();
        return (
            <div>
                <h2>redux===数据共享</h2>
                <h2>state 共享 数据缓存</h2>
                <hr></hr>
                <CounterDemo
                value={value}
                {...store.getState()}

                ></CounterDemo>
            </div>
        )
    }
}

const hotRender = ()=>{
    ReactDOM.render(
        <ReduxDemo/>,
        document.getElementById('root')
    )
}

hotRender();

store.subscribe(hotRender);  // 监听 state  state 改变 触发这个函数 从而刷新视图 view



