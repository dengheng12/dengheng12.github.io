import React,{Component} from "react";

import{
    Switch,
    Route,
    Redirect,
    NavLink
} from "react-router-dom";
import LazyLoad from "../../utils/lazyload";

// import Login from "./login"
// import Guide from "./guide"
// import Home from "./home"
// import Main from "./main"
import Main from "./main"
export default class MainLayout extends Component{
    render(){
        return(
            <div>
                <div>
                    <Switch>
                        <Route path="/guide" component={LazyLoad(()=>import("./guide"))}></Route>
                        <Route path="/login" component={LazyLoad(()=>import("./login"))}></Route>
                        <Route path="/search" component={LazyLoad(()=>import("./search"))}></Route>
                        <Route path="/main" component={LazyLoad(()=>import("./main"))}></Route>
                        <Route path="/scan" component={LazyLoad(()=>import("./scan"))}></Route>
                        <Route path="/detail" component={LazyLoad(()=>import("./detail"))}></Route>
                        <Route path="/shou" component={LazyLoad(()=>import("./shou"))}></Route>
                        <Route component={()=>(<Redirect to="/guide" />)}></Route>
                    </Switch>
                </div>
        </div>
            
        )
    }
}