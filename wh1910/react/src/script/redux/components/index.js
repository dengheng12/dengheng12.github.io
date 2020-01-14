import React,{Component} from "react";
import store from "../store";
import {Button} from  "antd-mobile";
import {countDesc,changeCount, changeMsg, changeCity,changeInp,changeMvAsync}from "../actions"



export default class CounterDemo extends Component {
    handleChangeInp=(e)=>{
        console.log(store)
        store.dispatch(changeInp(e.target.value))
        console.log(e.target.value)
    }
    render() {
        const{
            value,
            count,
            msg,
            city,
            data:{
                mv,
                inp
            }
        }=this.props;
        console.log(this.props);
        var state=store.getState();
        console.log(state)
        return (
            <div>
                <h2>redux==demo</h2>
                <h2>count===={count}==={value.count}========{state.count}</h2>
                <h2>msg====msg========{state.msg}</h2>
                <h2>city====city========{state.city}</h2>
                <h2>inp====inp========{inp}</h2>
                <p>
                    <input type="text" ref={el=>this.inp=el} value={inp} onChange={this.handleChangeInp}></input>
                </p>
                {
                    mv&&mv.map((item,index)=>{
                        return(
                           <p key={index}>
                            {index}=========={item.name}
                        </p> 
                        )
                        
                    })
                }
                <Button onClick={()=>store.dispatch({type:"countADD"})} inline type="warning">count add</Button>
                <Button onClick={()=>store.dispatch(countDesc)} inline type="warning">count desc</Button>
                <Button onClick={()=>{store.dispatch(changeCount(10))}} inline type="warning">changeCount 10</Button>
                <Button onClick={()=>{store.dispatch(changeMsg('changemsg success'))}} inline type="primary">changemsg </Button>
                <Button onClick={()=>{store.dispatch(changeCity('浪漫的巴黎，土耳其'))}} inline type="primary">changecity </Button>
                <Button onClick={()=>{store.dispatch(changeMvAsync({url:"/react/mv"}))}} inline type="primary">changeMvAsync </Button>
            </div>
        )
    }
}
