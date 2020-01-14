



export const countAdd={
    type:"countAdd"
}
export const countDesc={
    type:"countDesc"
}

export function changeCount(payload){
    return{
        type:"changeCount",
        payload
    }
}

export function changeMsg(payload){
    return{
        type:"changeMsg",
        payload
    }
}