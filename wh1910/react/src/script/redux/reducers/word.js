import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP } from "../actions";
export const word=(state=['2020---双倍快乐'],action)=>{
    console.log(action);
    switch(action.type){
        case CHANGEWORD:
        return [action.payload];
        break;

        default:
        return state;
        break;

    }
}