import {axios} from "&"

export const countDesc ={
    type:"COUNTDESC"
}

export const changeCount=(payload)=>{
    return{
        type:"changeCount",
        payload
    }
}
export function changeCity(payload){
    return {
        type:"changeCity",
        payload
    }
}

export async function getMvAsync({url,params}){
 const res=await axios.get(url)
 console.log(res);
    return{
        type:"getMv",
        payload:res.data.result.data
    }
}