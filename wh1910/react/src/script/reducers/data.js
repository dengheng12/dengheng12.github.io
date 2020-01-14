import immutable from "immutable";
const defaultState = immutable.fromJS({
    count: 2000,
    ball:[],
    find:[],
    running:[],
    fitness:[],
    goodList:[],
    goodType:[]
})

export const data = (state = defaultState, action) => {
    console.log(action);
    switch (action.type) {
        case "countAdd":
            return state.set("count", state.get("count") + action.payload);
            break;
        case "getball":
            return state.set("ball",action.payload);
            break;
        case "getfind":
            return state.set("find",action.payload);
            break;
        // case "getrun":
        //         return state.set("running",action.payload);
        //         break;
        case "getGoodList":
            return state.set("goodList",action.payload);
            break;
        case "getGoodType":
            return state.set("goodType",action.payload);
            break;
        default:
            return state;
            break;
    }
}