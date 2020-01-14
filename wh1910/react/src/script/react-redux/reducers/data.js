const defaultState={
    count:2020,
    city:"湖北洪湖",
    show:true,
    mv:[]
}
export const data=(state=defaultState,action)=>{
    console.log(action);
    switch(action.type){
        case "COUNTADD":
        return {...state,count:++state.count};
        break;
        case "COUNTDESC":
        return {...state,count:--state.count};
        case "changeCount":
        return {...state,count:state.count+action.payload};
        break;
        case "changeCity":
        return {...state,city:action.payload};
        break;
        case "getMv":
        return {...state,mv:action.payload};
        break;
        default:
        return state;
        break;
    }
}
