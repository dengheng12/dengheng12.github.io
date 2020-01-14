import "./index.scss";
import React,{Component}  from "react";
import Head from "~/components/head";
import {axios,history} from "&"
import shou from "~/mobx/shopcar";
import {observer} from "mobx-react";
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import {Button} from "antd-mobile"

@observer
class Shou extends Component{
    componentDidMount(){
        shou.getShou("/react/getShou");
    }
    handleShou=(goodId)=>{
        shou.delShou(goodId)

    }
    todohome=()=>{
        console.log(this.props)
        this.props.history.push("/main/home")
    }
    render(){
        const{
            shouList
        }=shou;
        console.log(shouList)
        return(
            <div className="shou">
                <Head title="收藏" seacher={true} show={true}></Head>
                <WingBlank size="lg">
                <WhiteSpace size="lg" />
                {
                  shouList&&shouList.map((item,index)=>{
                      return(
                          <Card key={index} style={{marginBottom:10}} className="move-in">
                    <Card.Header
                        title={item.goodInfo.title}
                        extra={<span>￥{item.goodInfo.price}</span>}
                    />
                    <Card.Body>
                        <div className="img"><img src={item.goodInfo.img}></img></div>
                    </Card.Body>
                    <Card.Footer content="感谢收藏" extra={<div><span onClick={()=>this.handleShou(item.goodId)}>取消收藏</span></div>} />
                    </Card>   
                      )
                    
                  })  
                }
                {
                    !shouList.length>0&&<div>
                        <p 
                        style={{width:"100%",
                        textAlign:"center",
                        fontSize:18,
                        marginBottom:18
                        }}>您还没有收藏任何商品，请添加收藏商品</p>
                        <p
                          style=
                          {{margin:"0 auto",
                            width:"100%",
                            textAlign:"center"
                        }}
                        >
                            <Button onClick={this.todohome} type="primary" inline>点击前往首页</Button>
                        </p>
                        
                    </div>
                }
                 
                </WingBlank>
            </div>
        )
    }
}
export default Shou;