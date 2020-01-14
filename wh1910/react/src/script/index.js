import React, {Component} from "react";
import {Provider} from "react-redux";
import store from "./store";
import {
    HashRouter as Hash,
    Route,
    Switch
} from "react-router-dom";

import MainLayout from "./views";



export class MainRouter extends Component{
    render(){
        return(
          <Provider store={store}>
            <Hash>
            <Route component={MainLayout}></Route>
          </Hash> 
          </Provider>
           
        )
        
    }
}