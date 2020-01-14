import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP } from "../actions";

const defaultState ="武汉6666";
export const city=(state=defaultState,action)=>{
    switch(action.type){
        case CHANGCITY: 
        return action.payload;
        break;
        default:
        return state;
        break;
    }
}