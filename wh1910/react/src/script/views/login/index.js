import "./index.scss";
import React, { Component } from "react";
import {axios} from "&"
import Head from "../../components/head";
import { List, InputItem, Toast ,Button,WhiteSpace,WingBlank,NoticeBar} from "antd-mobile";

export const mReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
export const cReg = /^\d{4}$/;
let timer = null;
export default class Login extends Component {
    state = {
        codeFlag:false,
        loginFlag:false,
        count:10,
        txt:"发送验证码",
        toggle:true
    }
    handleCheckTel=(tel)=>{
        var code = this.code.state.value;
        if(this.state.toggle){
            this.setState({
                codeFlag:mReg.test(tel),
                loginFlag:mReg.test(tel)&&cReg.test(code)
            }) 
        }
        
    }

    handleCheckCode=(code)=>{
        var tel = this.tel.state.value;
        this.setState({
            loginFlag:mReg.test(tel)&&cReg.test(code)
        })
    }


    start =()=>{
        if(this.state.count>1){
            this.setState({
                count:--this.state.count,
                txt:`剩 ${this.state.count}S`,
                codeFlag:false,
                toggle:false
            })
        }else{
            clearInterval(timer);
            timer = null;
            this.setState({
                count:10,
                txt:'发送验证码',
                codeFlag:true,
                toggle:true
            })
        }
    }

    computedTime=()=>{
        console.log("click")
        this.start();
        timer = setInterval(this.start,1000);
    }
    handleSendCode=()=>{
        this.computedTime();
        axios.post("/react/aly/sendSms",{
            tel:this.tel.state.value
        }).then(res=>{
        })
    

    }
    handleSumbit=()=>{
        // 校验验证码 
        axios.post("/react/checkCode",{
            tel:this.tel.state.value,
            code:this.code.state.value
        }).then(res=>{
            // console.log(res)
            if(!!res.data.type){
                sessionStorage.token = res.data.token;
                sessionStorage.tel = this.tel.state.value;
                this.props.history.push("/main/mine");
            }else{
                sessionStorage.token = "";
                sessionStorage.tel = "";
            }
        })
    }
    render() {
        const{
            codeFlag,
            loginFlag,
            txt
        }=this.state;
        return (
            <div>
                <Head title="登录" show={true} seacher={true} login={true}></Head>
                <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                    好好学习，天天向上，good good study, day day up! 加油，坚持就是胜利，奥利给！！！
                </NoticeBar>
                <List>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <InputItem
                        defaultValue="15377186137"
                        type="tel"
                        placeholder="请输入手机号"
                        clear
                        ref={el=>this.tel=el}
                        onChange={this.handleCheckTel}
                    >手机号：</InputItem>
                     <WhiteSpace></WhiteSpace>
                     <WhiteSpace></WhiteSpace>
                    <InputItem
                        className="item"
                        // defaultValue="Title"
                        placeholder="请输入验证码"
                        type="number"
                        ref={el=>this.code=el}
                        onChange={this.handleCheckCode}
                    >验证码：
                    <Button inline type="warning" 
                    onClick={this.handeCode} 
                    className="btn" 
                    disabled={!codeFlag} 
                    onClick={this.handleSendCode}
                    >{txt}</Button>
                    </InputItem>
                    <Button 
                    type="primary" 
                    disabled={!loginFlag}
                    onClick={this.handleSumbit}
                    >马上登录</Button>
                </List>


            </div>
        )
    }

}