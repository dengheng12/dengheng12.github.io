import "./index.scss";
import React, { Component } from "react";
import Head from "../../components/head";
import { connect } from "react-redux";
import { countAdd } from "~/action";
import { observer } from "mobx-react";
import { Button, Checkbox, NoticeBar, Stepper , Modal,Result} from "antd-mobile"
import shopcar from "~/mobx/shopcar";
const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
@observer
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal1: false,
        };
      }
      
      showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
      }
      onClose = key => () => {
        this.setState({
          [key]: false,
        });
      }
    componentDidMount() {
        shopcar.getCarList("/react/getCarList");
    }
    changeCount(goodId,v){
        console.log(v.target.value);
        if(v.target.value*1>=1){
            shopcar.changeOneCountNum(goodId,v.target.value*1)
        }

    }
    add(goodId,count){
        if(count*1>=1){
            shopcar.changeOneCount(goodId,1)
        }
    }
    reduce(goodId,count){
        if(count*1>1){
            shopcar.changeOneCount(goodId,-1)
        }
    }
    checkOne=e=>{
        console.log(e.target.checked);
        shopcar.changeOneChecked(e.target.checked,e.target.goodId);
    }
    checkAll=(e)=>{
        console.log(e.target.checked);
        // shopcar.quan =   e.target.checked;
        shopcar.changeQuan(e.target.checked);
    }
    delSelect(){
        console.log(111);
        shopcar.delSelect()
    }
    handeHome=()=>{
        console.log(this.props)
        this.props.history.push("/main/home")
    }
    handleLogin=()=>{
        this.props.history.push("/login")
    }
    render() {
        const {
            carList,
            carNum,
            total,
            quan
        } = shopcar
        console.log(shopcar)
        return (
            <div>
                <Modal
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={this.onClose('modal1')}
                title="支付完成"
                footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                style={{width:'80%'}}
            >
          <div >
          <Result
                img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
                title="支付成功"
                message={<div>{total}元</div>}
            />
          </div>
        </Modal>
                <Head title="购物车"></Head>
                <div style={{ display: sessionStorage.token ? 'none' : 'block' }}>
                    <img src="http://jp.juancdn.com/jpwebapp_v1/images_v1/shopping/empty-cart.png"></img>
                    <Button type="primary" onClick={this.handleLogin} > 马上登录  </Button>
                </div>
                <div style={{ display: !sessionStorage.token ? 'none' : 'block' }}>
                    <div style={{ display: carList.length > 0 ? 'none' : 'block' }}>
                        <div className="noNum" style={{width:"100%"}}>
                            <img src="http://jp.juancdn.com/jpwebapp_v1/images_v1/shopping/empty-cart.png"></img>
                            <Button type="warning" onClick={this.handeHome}>立即购物</Button>
                        </div>
                        

                    </div>
                    <div style={{ display: !carList.length > 0 ? 'none' : 'block' }}  >
                        <div id="shopcar">
                            <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                                “啤酒饮料矿泉水，花生瓜子八宝粥了～”，“来这位乘客，把腿收一下～”
                </NoticeBar>
                            {
                                carList.length>0 && carList.map((item, index) => {
                                    return (
                                        item.goodInfo && <ul key={index}>
                                            <li style={{ width: "11%" }}>
                                                <Checkbox
                                                    checked={item.checked}
                                                    goodId={item.goodId}
                                                    onChange={this.checkOne} >
                                                </Checkbox>
                                            </li>
                                            <li style={{ width: "24%" }}>
                                                <img src={item.goodInfo.img}></img>
                                            </li>
                                            <li style={{ width: "38%" }}>
                                                <p>{item.goodInfo.title}</p>
                                                <p>￥{item.goodInfo.price}</p>
                                            </li>
                                            <li style={{ width: "26%" }}>
                                                <span onClick={()=>this.reduce(item.goodId,item.count)}>-</span>
                                                <input type="text" value={item.count} onChange={(v) => { this.changeCount(item.goodId, v) }}></input>
                                                <span onClick={()=>this.add(item.goodId,item.count)}>+</span>
                                            </li>
                                        </ul>
                                    )
                                })
                            }
                            <div className="carFoot">
                                <Checkbox style={{ width: '4%', float: 'left', marginLeft: '2%', lineHeight: '50px', }} onClick={this.checkAll} checked={quan} ></Checkbox>
                                <p onClick={this.delSelect} style={{ width: '28%', lineHeight: '50px', fontSize: '14px', color: "red", marginLeft: '4%' }} >删除选中</p>
                                <p style={{ width: '36%', lineHeight: '50px', color: "#fff" }}>
                                    商品总价:<span style={{ width: '100px', color: "red" }}>￥{total} </span>
                                </p>
                                <p style={{ backgroundColor: '#5c3715', width: "26%", fontSize: '20px', lineHeight: '50px', textAlign: 'center', color: "#fff", letterSpacing: '2px' }} onClick={this.showModal('modal1')}>下单 {carNum} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Cart;