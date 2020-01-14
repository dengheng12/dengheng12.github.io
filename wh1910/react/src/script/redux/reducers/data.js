import { CHANGECOUNT, CHANGCITY, CHANGEMSG, CHANGEWORD, CHANGEINP} from "../actions";
const defaultState = {
    mv:[],
    inp:"1910-奋斗react",

}



export const data=(state=defaultState,action)=>{
    switch(action.type){
        case CHANGEINP:
        return {...state,inp:action.payload};
        break;
        case "changeMvAsync":
        return {...state,mv:action.payload};
        break;
        
        default:
        return state;
        break;

    }
}