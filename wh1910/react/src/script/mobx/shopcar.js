import {observable, action, computed, autorun} from  "mobx";
import {axios} from "&";

class Shopcar{
    @observable carList=[];
    @observable shouList=[];
    @action getCarList=async (url)=>{
        const res=await axios.get(url);
        this.carList=res.data.result;
    }
    @action delSelect= ()=>{
        axios.post("/react/delSelect").then(res=>{
            this.carList= this.carList.filter(item=>!item.checked)
        })
    }
    @action changeOneCount=(goodId,flag)=>{
        axios.post("/react/changeCount",
        {
            goodId,
            flag
        }).then(res=>{
            this.carList=this.carList.map(item=>{
                if(item.goodId==goodId){
                    item.count+=flag;
                }
                return item;
            })
        })
    }
    @action changeOneCountNum=(goodId,count)=>{
        axios.post("/react/changeCount",{
            goodId,
            count
        }).then(res=>{
            console.log(res)
            this.carList=this.carList.map((item)=>{
                if(item.goodId==goodId){
                    item.count=count;
                }
                return item
            })

        })
    }

    @action changeOneChecked = (checked,goodId)=>{
        axios.post("/react/changeChecked",{
            checked,
            goodId
        }).then(res=>{
            this.carList = this.carList.map((item)=>{
                if(item.goodId==goodId){
                    item.checked = checked
                }
                return item;
            })
        })
    }
    @action getShou= async(url)=>{
        const res=await axios.get(url);
        this.shouList=res.data.result;
        console.log(this.shouList)
    }
    @action addShou=(goodId,goodInfo)=>{
        axios.post("/react/addShou",{
            goodId,
            goodInfo
        }).then(res=>{
            console.log(res);
        })
    }

    @action delShou=(goodId,goodInfo)=>{
        axios.post("/react/delshou",{
            goodId
        }).then(res=>{
            this.shouList=this.shouList.filter(item=>item.goodId!==goodId);
            console.log(this.shouList)
        })
    }
   
    @action changeQuan = checked =>{
        axios.post("/react/changeChecked",{
            checked,
        }).then(res=>{
            this.quan = checked;
            console.log(this.quan)
        })
        
    }
    @computed get carNum(){
        var carNum=0;
        this.carList.forEach(item=>{
            if(item.checked){
                carNum+=item.count;
            }
        })
        return carNum;
    }
    @computed get total(){
        var total=0;
        this.carList.forEach(item=>{
            if(item.checked){
                total+=(item.count*1)*(item.goodInfo.price*1);
            }
        })
        return total;
    }

    @computed get quan(){
        var quan = true;
        this.carList.forEach(item=>{
            if(!item.checked){
                quan = false;
            }
        })
        return quan;
    }
    set quan(newVal){
        this.carList = this.carList.map((item)=>{
            item.checked = newVal;
            return item;
        })
    }
}

export default new Shopcar()