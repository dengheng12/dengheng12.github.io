import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP } from "../actions";
const defaultState=2023;
export const count =(state=defaultState,action)=>{
    switch(action.type){
        case "countADD": ++state; return state; break;
        case "countDesc": --state; return state; break;
        case CHANGECOUNT:
        return state+action.payload;break;

        default:
        return state;
        break;
    }
}
