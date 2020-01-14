import "./index.scss";
import React, { Component } from "react";
import {Link} from "react-router-dom"
import Head from "../../components/head";
import UploadImg from "@/script/components/uploadImg";
import {Button} from "antd-mobile";
import {history,axios} from "&";




export default class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            tel:null
        }
    }
    todoLogin(){
        history.push("/login");
    }
     componentDidMount(){
         axios.post("/react/getTel").then(
             res=>{
                 this.setState({
                     tel:res.data.result
                 })
             }
         )
         if(sessionStorage.tel){
             this.setState({
                 show:true
             })

         }
     }
    
    render() {
        const{
            show
        }=this.state;
        return (
            <div>
                {show&&<div>
                    <UploadImg></UploadImg>
                    <div className="list">
                        <span>我的识货</span>
                        <ul>
                            <li>
                                <Link to="/shou">
                                <img src="http://sh1.hoopchina.com.cn/images/trade/app/personal/collect_content.png" alt="" />
                                <p>我的收藏</p>
                                </Link>
                            </li>
                            <li>
                                <img src="http://sh1.hoopchina.com.cn/images/trade/app/personal/my_shaiwu.png" alt="" />
                                <p>我的晒物</p>
                            </li>
                            <li>
                                <img src="http://sh1.hoopchina.com.cn/images/trade/app/personal/kaiquan.png" alt="" />
                                <p>我的礼品</p>
                            </li>
                        </ul>

                    </div>
                    <div className="page">
                        <span>识货必备</span>
                        <ul>
                            <li>
                                <img src="http://sh1.hoopchina.com.cn/images/trade/app/personal/tuijiandianpu.png" alt="" />
                                <p>推荐店铺</p>
                            </li>
                            <li>
                                <img src="http://sh1.hoopchina.com.cn/images/trade/app/personal/select_shoe.png" alt="" />
                                <p>黑科技选鞋</p>
                            </li>

                        </ul>

                    </div>
                </div>}
               {!show&&<div>
                    <Head title="我的"></Head>
                    <h2>还没登录?马上登录</h2>
                    <Button inline type="warning" onClick={this.todoLogin}>马上登录</Button>
                </div>}
            </div>
        )
    }
}