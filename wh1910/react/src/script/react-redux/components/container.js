import React,{Component} from "react";
import {Button} from "antd-mobile";
import {connect} from "react-redux";
import {countDesc,changeCount,changeCity,getMvAsync} from "../action";


@connect(
    (state)=>{
        console.log(state);
        return {
            ...state
        }
    },
    dispatch=>{
        return{
            countAdd:()=>dispatch({type:"COUNTADD"}),
            countDesc:()=>dispatch(countDesc),
            changeCount:(payload)=>dispatch(changeCount(payload)),
            changeCity:(payload)=>dispatch(changeCity(payload)),
            getMvAsync:(payload)=>dispatch(getMvAsync(payload))
        }
    }
)
class ContainerUI extends Component{
    render(){
        console.log(this.props);
        const{
            data:{
                count,
                show,
                city,
                mv
            },
            countAdd,
            countDesc,
            changeCount,
            changeCity,
            getMvAsync
        }=this.props;
        return(
            <div>
                <h2> react-redux 实现计数器  </h2>
                <h2>这是一层 UI 组件 </h2>
                <h2>@connect 类的装饰器 </h2>
                <h2>count=============={count}</h2>
                <h2>city=============={city}</h2>
                {
                    mv&&mv.map((item,index)=>{
                        return(
                        <p key={index}>{index}================{item.name}</p>
                        )
                    })
                }
                <Button type="primary" inline onClick={()=>countAdd()}>countadd</Button>
                <Button type="warning" inline onClick={countDesc}>countDesc</Button>
                <Button type="warning" inline onClick={()=>changeCount(10)}>countchange</Button>
                <Button type="warning" inline onClick={()=>changeCity("美丽土耳其")}>changeCity</Button>
                <Button type="warning" inline onClick={()=>getMvAsync({url:"/react/mv"})}>getMvAsync</Button>
            </div>
        )
    }

}
export default ContainerUI;

