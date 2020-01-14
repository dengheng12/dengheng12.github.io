import {observable, action, computed, autorun} from "mobx";
import {axios} from "&"
class Demo {
    @observable count=2020;
    @observable msg="好好学习天天向上";
    @observable list=[];
    @action countAdd=()=>{
        console.log(this.count);
        this.count++;
    }
    @action changeCount=(payload)=>{
        console.log(this.count);
        this.count+=payload;
    }
    @action changeMsg=(payload)=>{
        this.msg=payload;
    }
    @action getList=({url,params})=>{
        axios.get(url).then(res=>{
            console.log(res)
            this.list=res.data.obj;
        }
            
        )
        
        
    }

}


export default new Demo();