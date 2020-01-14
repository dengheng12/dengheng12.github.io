import immutable from "immutable";
const defaultState = immutable.fromJS({
    count:2020,
    city:"湖北省洪湖市",
    msg:"How are you"
})

export const data=(state=defaultState,action)=>{
    console.log(action);
    switch(action.type){
        case "countAdd":
        return state.set("count",state.get("count")+1);
        break;
        case "countDesc":
        return state.update("count",x=>x-1);
        break;
        case "changeCount":
        return state.update("count",x=>x+action.payload);
        break;
        case "changeMsg":
        return state.set("msg",action.payload);
        break;


        

        default:
        return state;
        break
    }
}