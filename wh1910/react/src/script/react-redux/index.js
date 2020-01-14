import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import store from "./store";
import ComponentUI from "./components/container"
import {Provider}  from "react-redux";


class MainDemo extends Component{
    render(){
        return(
            <div>
                <h2>react-redux</h2>
                <h2>没有改变redux的数据原理 只是拆分组件</h2>
                <ComponentUI></ComponentUI>
            </div>
        )
    }
}

// this.context.store.getState()
const hotRender=()=>{
    console.log(store.getState())
    render(
        <Provider store={store}>
            <MainDemo></MainDemo>
        </Provider>,
        document.getElementById("root")
    )
}
hotRender();


