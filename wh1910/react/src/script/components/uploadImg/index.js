import "./index.scss";
import {axios,baseURL}  from "&"
import initpic from "@/assets/images/Pikachu.jpg";
import React ,{Component} from "react";

export default class uploadImg extends Component{
    constructor(){
        super();
        this.state = {
            pic:null
        }
    }
    componentDidMount(){
        let userInfo = localStorage.userInfo;
        console.log(userInfo)
        if(userInfo){
            userInfo = JSON.parse(userInfo);
            console.log(userInfo)
            if(userInfo.tel==sessionStorage.tel){
                console.log(111)
                this.setState({
                    pic:userInfo.pic
                })
            }else{
                this.getInitPic();
            }
        }else{
            this.getInitPic();
        }
    }

    getInitPic =()=>{
        axios.post("/react/getImg")
        .then(res=>{
            if(!!res.data.type){
                this.setState({
                    pic:res.data.result.pic.replace(/public/,baseURL)
                })
            }else{
                this.setState({
                    pic:initpic
                })
            }
        })
    }
    handleClick=()=>{
        console.log("click");
        this.refs.file.click()
    }
    handleChange=()=>{
        console.log("上传头像成功");
        var file=this.refs.file.files[0];
        console.log(file);
        var data=new FormData();
        console.log(data);
        data.append("avater",file);
        console.log(data);
        axios({
            url:"/react/uploadImg",
            method:"POST",
            data
        }).then(res=>{
            console.log(res)
            if(!!res.data.type){
                var pic=res.data.pic.replace(/public/,baseURL);
                const userInfo=JSON.stringify({
                    tel:res.data.tel,
                    pic
                })
                localStorage.userInfo=userInfo;
                this.setState({
                    pic
                })

            }else{
                localStorage.userInfo=""
            }
        })

    }
    out=()=>{
        console.log("out")
    }
    render(){
        const{
            pic
        }=this.state;
        return(
            <div className="touxiang">
                    <img src={pic} alt="" className="pic" onClick={this.handleClick}/>
                    <input type="file" className="file" ref="file" onChange={this.handleChange}></input>
                    <div className="info">
                        <p>用户名:小七之家</p>
                        <p className="jb">
                            <span>金币&nbsp;0</span>
                            <span className="logout" onClick={this.out}>
                                退出>>
                            </span>
                        </p>
                    </div>
            </div>
        )
    }
}
