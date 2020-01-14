

import {axios} from "&"

export function countAdd(payload){
   return{
       type:"countAdd",
       payload
   }

}
export async function getBallAsync({url,params,cb}){
    const res=await axios.get(url);
    cb();
    console.log(res);
       return{
           type:"getball",
           payload:res.data.result
       }
   }


   export async function getFindAsync({url,params,cb}){
    const res=await axios.get(url);
    cb();
    console.log(res);
       return{
           type:"getfind",
           payload:res.data.result
       }
   }

  


export async function getGoodList({url,params}){
    const res = await axios.get(url,{params});
    return {
        type:"getGoodList",
        payload:res.data.result
    }
} 

export async function getGoodType({url,params}){
    const res = await axios.get(url,{params});
    return {
        type:"getGoodType",
        payload:res.data.result
    }
} 