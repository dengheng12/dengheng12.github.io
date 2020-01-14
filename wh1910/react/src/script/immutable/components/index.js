import React, {Component} from "react";
import ReactDOM,{render} from "react-dom";
import {connect} from "react-redux";
import {Button} from "antd-mobile";
import store from "../store";
import {countAdd,countDesc,changeCount,changeMsg} from "../actions";

@connect(
    state=>{
        console.log(state);
        return{
            data:state.get("data"),
            count:state.getIn(['data','count']),
            city:state.getIn(['data','city']),
            msg:state.getIn(['data','msg']),
        }

    }
)
 class ImmutableCounter extends Component{
     handleChange=()=>{
         console.log(this);
         this.props.dispatch(changeMsg(this.inp.value));

     }
    render(){
        console.log(this.props);
        const {
            data,
            count,
            city,
            msg,
            dispatch
        }=this.props;
        return(
            <div>
                <h2>ImmutableCounter==========</h2>
                <h2>1233</h2>
                <h2>count=========={count}</h2>
                <h2>msg=========={msg}</h2>
                <p>
                    <input value={msg} onChange={this.handleChange} ref={el=>this.inp=el} type="text"></input>
                </p>
                
                <Button type="warning" inline onClick={()=>dispatch(countAdd)}> countadd</Button>
                <Button type="warning" inline onClick={()=>dispatch(countDesc)}> countdesc</Button>
                <Button type="warning" inline onClick={()=>dispatch(changeCount(10))}> countAdd 10</Button>
            </div>
        )
    }
}

export default ImmutableCounter;