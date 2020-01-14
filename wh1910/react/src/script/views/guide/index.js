import "./index.scss";
import React, { Component } from "react";
import {MySwipe} from "../../components/swiper";
import {
    HashRouter as Hash,
    Router

} from "react-router-dom";
import { Button, WingBlank, WhiteSpace } from "antd-mobile";
const SwipeItem = MySwipe.Item;
export default class Guide extends Component {
    constructor() {
        super();
        this.state = {
            imgs: [
                require("@/assets/images/1.jpg"),
                require("@/assets/images/2.jpg"),
                require("@/assets/images/3.jpg"),
                require("@/assets/images/4.jpg")
            ]
        }
    }
    componentDidMount() {
        if (localStorage.visitCount) {
            localStorage.visitCount++;
            if (localStorage.visitCount > 3) {
                this.props.history.push("/main/home");
            }
        } else {
            localStorage.visitCount = 1;
        }
    }
    handleGotoMain=(index)=>{
        if(index==this.state.imgs.length-1){
            this.props.history.push("/main/home");
        }
    }
    render(){
        return (
            <div className="g-box">
                <MySwipe
                    id="guide"
                    options={{loop:false,autoplay:{delay:1500},speed:1200}}
                >
                    {
                        this.state.imgs.map((item,idx)=>{
                            return (
                                <SwipeItem key={idx} >
                                    <img  src={item}  className="g-img" alt=""/>
                                    {idx==this.state.imgs.length-1&&<button className="btn" onClick={()=>this.handleGotoMain(idx)}>进入首页</button>}
                                </SwipeItem>    
                            )
                        })
                    }
                </MySwipe>   
            </div>
        )
    }
}