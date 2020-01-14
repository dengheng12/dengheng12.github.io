import "./index.scss";
import React, { Component } from "react";
import {
    NavLink
} from "react-router-dom";

import {Badge} from "antd-mobile";
import { observer } from "mobx-react";
import shopcar from "~/mobx/shopcar";

export const foots = [
    {txt:"首页",path:"/main/home",name:"home",icon:"icon-shouye"},
    {txt:"发现",path:"/main/find",name:"find",icon:"icon-faxian"},
    {txt:"购物车",path:"/main/cart",name:"cart",icon:"icon-cart--copy"},
    {txt:"我",path:"/main/mine",name:"mine",icon:"icon-home_my"}
];


 @observer
 class Foot extends Component{
    state={
        foots,
        active:2
    }
    componentDidMount(){
        console.log("mount");
        this.setState({
            active:localStorage.active
        })
    }
    handleChangeActive=(index)=>{
        console.log(index);
        localStorage.active = index;
    }
    render(){
        const{
            active,
            foots

        }=this.state;
        const {
            carList,
            carNum,
            total,
            quan
        } = shopcar
        return(
            <footer>
                {
                    foots.map((item,i)=>{
                        return(
                            <div key={i} onClick={this.handleChangeActive(i)}>
                                <NavLink to={item.path} activeClassName="nav-active">
                                    {
                                       i==2&&<Badge className="hot">
                                        <span style={{ width: '16px', height: '16px', background: 'red', display: 'inline-block', color:"#fff" ,textAlign:"center",lineHeight:"16px",borderRadius:"50%",fontSize:"8px"}} >{carNum}</span>
                                      </Badge> 
                                    }
                                     
                                    <i className={"iconfont "+item.icon}></i>
                                   
                                    <span>{item.txt}</span>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </footer>
        )
    }
}

export  {Foot}