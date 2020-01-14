import "./index.scss";
import React, {Component} from "react";
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import {Foot} from "../../components/foot";
import LazyLoad from "&/lazyload";
export default class Main extends Component{
    render(){
        return(
            <div className="main">
                <Switch>
                    <Route path="/main/home" component={LazyLoad(()=>import("../home"))}></Route>
                    <Route path="/main/find" component={LazyLoad(()=>import("../find"))}></Route>
                    <Route path="/main/cart" component={LazyLoad(()=>import("../cart"))}></Route>
                    <Route path="/main/mine" component={LazyLoad(()=>import("../mine"))}></Route>
                </Switch>
                <Foot></Foot>
            </div>
        )
    }
}