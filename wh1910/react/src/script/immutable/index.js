import React, {Component} from "react";
import ReactDOM,{render} from "react-dom";
import{Provider} from "react-redux";
import ImmutableCounter from "./components";
import store from "./store";

export default class ImmutableDemo extends Component{
    render(){
        return(
            <div>
                <h2>ImmutableDemo==========</h2>
                <h2>1233</h2>
                <ImmutableCounter></ImmutableCounter>
            </div>
        )
    }
}
const hotRender=()=>{
    render(
        <Provider store={store}>
           <ImmutableDemo></ImmutableDemo> 
        </Provider>,
        document.getElementById("root")
    )
}
hotRender();