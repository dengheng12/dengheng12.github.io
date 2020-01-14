import "./index.scss";
import React,{Component}  from "react";
import Head from "~/components/head";
import {axios,history} from "&"
import shou from "~/mobx/shopcar";
import {observer} from "mobx-react";
import {
    WingBlank,
    WhiteSpace,
    Card,
    Stepper,
    Button
} from "antd-mobile"
console.log(shou)
@observer
 class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            count:1,
            goodId:"",
            goodInfo:{},
            flag:false,
            flag1:true
        }
    }

    
    changeCount=(val)=>{
        console.log(val)
        this.setState({count:val})
        console.log(this.state.count)
    }

    addToCar=()=>{
        axios.post(
            "/react/addCar",
            {
                goodId:this.state.goodId,
                goodInfo:this.state.goodInfo,
                count:this.state.count
            }
        ).then(res=>{
             history.push("/main/cart")
        })
        
    }
    handleShou=(goodId,flag,goodInfo)=>{
        console.log(flag);
        console.log(goodId)
        this.setState({
            flag:!this.state.flag
        })
        if(!flag){
            shou.addShou(goodId,goodInfo) 
        }else{
            shou.delShou(goodId)
        }
       
    }
    handleZan=(flag1)=>{
        console.log(flag1)
        this.setState({
            flag1:!this.state.flag1
        })
        console.log(111)
    }
    componentDidMount(){
        const{
           history,
           location,
           match
        }=this.props;
        var goodsId=new URLSearchParams(location.search).get("goodsId");
        console.log(goodsId)
        axios.get("/react/getGoodInfo?goodsId="+goodsId).then(res=>{
            this.setState({
                goodId:res.data.result._id,
                goodInfo:res.data.result.data
                
            })
        });
        // shou.getShou("/react/getShou")

    }
    render(){
        
        const{
           goodId,
           goodInfo,
           flag,
           flag1
        }=this.state;
        console.log(goodId)
        return(
            <div>
                <Head title="详情" show={true}></Head>
                <WingBlank size="sm">
                    <WhiteSpace size="sm" />
                    <Card>
                    <Card.Header
                        title={goodInfo.title}
                        extra={<span>RMB:¥{goodInfo.price}</span>}
                    />
                    <Card.Body>
                        <p style={{padding:"10px"}}>{goodInfo.intro}</p>
                        <div><img style={{width:"100%",height:"4rem"}} src={goodInfo.img} alt=""/></div>
                    </Card.Body>
                    {/* <Card.Footer content="点赞" extra={flag&&<div onClick={()=>this.handleShou(flag)}>收藏</div>}/> */}
                    </Card>
                    <div style={{background:"#FFF",display:"flex",paddingTop:10,justifyContent:"space-between"}}>
                        <div className="fleft">
                            {flag1&&<span onClick={()=>this.handleZan(flag1)}>点赞</span>}
                            {!flag1&& <span onClick={()=>this.handleZan(flag1)} style={{color:"red"}}>点赞</span>}
                        </div>
                        <div className="fright">
                            {!flag&&<span onClick={()=>this.handleShou(goodId,flag,goodInfo)}>收藏</span>}
                            {flag&&<span style={{color:"red"}}  onClick={()=>this.handleShou(goodId,flag,goodInfo)}>收藏</span>}
                        </div>
                    </div>
                    <WhiteSpace size="lg" />
                    <div>
                     <span style={{margin:"0 10px"}}>购买数量:</span>
                    
                    <Stepper
                        style={{ width: '50%', minWidth: '100px' }}
                        showNumber
                        min={1}
                        value={this.state.count}
                        onChange={this.changeCount}
                        step={1}
                        />
                    </div>
                    <WhiteSpace size="lg" />
                    <Button type="warning" > 立即购买 </Button>
                    <WhiteSpace size="lg" />
                    <Button type="primary" onClick={this.addToCar}>加入购物车</Button>
                </WingBlank>
            </div>
        )
    }
}

export  default  Detail;