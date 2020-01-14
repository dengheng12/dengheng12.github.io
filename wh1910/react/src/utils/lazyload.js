import React from "react";
import Loadable from "react-loadable";


const loadingComponent=()=>{
    console.log("懒加载")
    return(<div>loading..................................</div>)
}

export default (loader,loading=loadingComponent)=>{
    return Loadable({
        loader,
        loading
    })
}