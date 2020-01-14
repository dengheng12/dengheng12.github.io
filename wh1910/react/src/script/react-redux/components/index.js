import React,{Component} from "react";
import {connect} from "react-redux";
import {Button} from "antd-mobile";
import {countDesc,changeCount,changeCity,getMvAsync} from "../action"
  class ReactReduxDemo extends Component{
    render(){
        console.log(this.props);
        const{
            data:{
               count,
               city,
               mv,
               show
            },
            countAdd,
            countDesc,
            changeCount,
            changeCity,
            getMvAsync
        }=this.props
        return(
            <div>
                <hr/>
                <h2>react-redux------===实现计数器</h2>
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

//输入逻辑
const mapStateToProps=(state)=>{
    console.log(state);
    return{
        data:state.data
    }
}
//输出逻辑
const mapDispatchToProps=(dispatch)=>{
    return{
       countAdd:()=>dispatch({type:"COUNTADD"}),
       countDesc:()=>dispatch(countDesc),
       changeCount:(payload)=>dispatch(changeCount(payload)),
       changeCity:(payload)=>dispatch(changeCity(payload)),
       getMvAsync:(payload)=>dispatch(getMvAsync(payload))
    }
}


export default connect (
    mapStateToProps,
    mapDispatchToProps
   
)(
    ReactReduxDemo
)