import "./index.scss";
import React, { Component } from "react";
import Head from "../../components/head"
import { MySwipe } from "../../components/swiper";
import { PullToRefresh, ListView, Tabs, WhiteSpace, Badge } from 'antd-mobile';
import ListContainer from "~/components/listcouter";

import {connect} from "react-redux"
import { getGoodList, getGoodType } from "~/action";


const SwipeItem = MySwipe.Item;
// const tabs = [
//     { title: "推荐", type: "tui" },
//     { title: "篮球", type: "basketball" },
//     { title: "跑步", type: "running" },
//     { title: "健身", type: "fitness" },
//     { title: "潮流", type: "freestyle" },
// ];
 @connect(
    state=>{
        console.log(state);
        return{
            goodList:state.getIn(['data','goodList']),
            goodType:state.getIn(['data','goodType'])
        }
      }
 )
 class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [
                {img:require("@/assets/images/bg1.png"),a:"http://t.shihuo.cn/m/563.html#qk=banner&amp;order=2"},
                {img:require("@/assets/images/bg2.png"),a:"http://t.shihuo.cn/m/565.html#qk=banner&order=1"},
               {img:require("@/assets/images/bg3.png"),a:"http://www.shihuo.cn/article/detail/24257.html#qk=banner&order=3"},
                {img:require("@/assets/images/bg4.jpg"),a:"http://www.shihuo.cn/app/assets/yjg/1.0.0/index.html?id=29#qk=banner&order=5"},
               {img:require("@/assets/images/bg5.jpg"),a:"http://www.shihuo.cn/article/detail/24877.html#qk=banner&order=4"}
            ],

        }
    }
    
    componentDidMount(){
        const {
            dispatch ,
            goodList,
            goodType
        } = this.props;
        console.log(this.props)
        if(!goodList.length>0){
            dispatch(getGoodList({url:"/react/getGoodList"}))
        }

        if(!goodType.length>0){
            dispatch(getGoodType({url:"/react/getGoodTypes"}))
        }
    }
    render() {
        console.log(this.props)
        const {
            goodList,
            goodType
        } = this.props;
        console.log(goodList)
        const tabs = goodType.map((item)=>{
            item.title =  item.text;
            return item;
        })
        return (
            <div className="home">
                <Head title="首页"></Head>
                <div>
                    <MySwipe
                        id="home"
                        options={{ loop: false, autoplay: { delay: 1500 }, speed: 1200, pagination: { el: '.swiper-pagination' } }}
                    >
                        {
                            this.state.imgs.map((item, idx) => {
                                return (
                                    <SwipeItem key={idx} id="home-item">
                                        <a href={item.a}>
                                        <img src={item.img} className="g-img" alt="" />
                                        </a>
                                    </SwipeItem>
                                )
                            })
                        }

                    </MySwipe>
                </div>
                <div className="pic_banner">
                    <ul>
                        <li>
                            <div className="tit">
                                <h2>篮球</h2>
                                <p> 纯白系列秒杀</p>
                            </div>
                            <div className="pic">
                                <img src={require("./img/pic1.jpg")} alt="" />
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                <h2>跑步</h2>
                                <p> 女王节秒杀</p>
                            </div >
                            <div className="pic">
                                <img src={require("./img/pic2.jpg")} alt="" />
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                <h2>健身</h2>
                                <p>布瑞特装备秒杀</p>
                            </div>
                            <div className="pic">
                                <img src={require("./img/pic3.jpg")} alt="" />
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                <h2>足球</h2>
                                <p>其实是在吹总裁</p>
                            </div>
                            <div className="pic">
                                <img src={require("./img/pic4.png")} alt="" />
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                <h2>潮流</h2>
                                <p>78元短袖秒杀</p>
                            </div>
                            <div className="pic">
                                <img src={require("./img/pic5.jpg")} alt="" />
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                <h2>数码</h2>
                                <p>家用电吹风</p>
                            </div>
                            <div className="pic">
                                <img src={require("./img/pic6.jpg")} alt="" />
                            </div>
                        </li>
                    </ul>

                </div>
                <div className="hot">
                    <div>
                        <h2>今日特惠</h2>
                        <p className="desc">EQT 5折好价</p>
                        <p className="imgs">
                            <img src={require("./img/p1.jpg")} alt="" />
                        </p>
                    </div>
                    <div>
                        <h2>限时团购</h2>
                        <p className="desc">春节不打烊</p>
                        <p className="imgs">
                            <img src={require("./img/p2.jpg")} alt="" />
                        </p>
                    </div>
                    <div>
                        <h2>免费抽奖</h2>
                        <p className="desc">识货抽奖 天天免费</p>
                        <p className="imgs">
                            <img src={require("./img/p3.jpg")} alt="" />
                        </p>
                    </div>
                </div>
                <div className="hot-active">
                    <h2>热门活动</h2>
                    <ul>
                        <li>
                            <div className="img">
                                <img src='http://shihuo.hupucdn.com/appHome/201808/1710/5e683699826e2a13abd239e4e4e36793.jpg' alt="" />
                            </div>
                            <p className="p1">
                              skullcandy骷髅头耳机
                            </p>
                            <p className="p2">
                            券后低至89元起
                            </p>

                        </li>
                        <li>
                            <div className="img">
                                <img src="http://shihuo.hupucdn.com/appZone/201811/1216/32de94d3d483749627b0716d9cde722b.png" alt="" />
                            </div>
                            <p className="p1">
                            潮流圈的编辑们
                            </p>
                            <p className="p2">
                            Ta说
                            </p>
                        </li>
                        <li>
                            <div className="img">
                                <img src='http://shihuo.hupucdn.com/appZone/201811/1214/2720301b13ee5c2b0003f78125b698ea.jpg' alt="" />
                            </div>
                            <p className="p1">
                            1000块包全身
                            </p>
                            <p className="p2">
                            不说虚话
                            </p>
                        </li>
                        <li>
                            <div className="img">
                                <img src='http://shihuo.hupucdn.com/appZone/201801/3117/dfb166bb32589d4c0c0f33613a7160cc.jpg' alt="" />
                            </div>
                            <p className="p1">
                            装备微讯
                            </p>
                            <p className="p2">
                            2分钟懂你想要
                            </p>
                        </li>
                        <li>
                            <div className="img">
                                <img src='http://shihuo.hupucdn.com/appZone/201812/0411/965ca32793c9a42a11c0de32465d9a64.jpg' alt="" />
                            </div>
                            <p className="p1">
                            独家折扣专场
                            </p>
                            <p className="p2">
                            买到就是赚到！
                            </p>
                        </li>
                        <li>
                            <div className="img">
                                <img src='http://shihuo.hupucdn.com/appZone/201805/1414/c5f797407c24e87cb7648abc937e9955.jpg' alt="" />
                            </div>
                            <p className="p1">
                            热门资讯
                            </p>
                            <p className="p2">
                            最新最热门的数码资讯
                            </p>
                        </li>
                    </ul>
                </div>
                <div>
                    <Tabs tabs={tabs}
                        initialPage={0}
                        // onChange={(tab, index) => { console.log('onChange', index, tab); }}
                        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        tabBarActiveTextColor="#FF4338"
                        tabBarUnderlineStyle={{borderColor:"#FF4338"}}
                    >
                        {
                            goodType.map((item1,index)=>{
                                return(
                                   <ListContainer
                                 key={index}
                                 good={goodList.filter(item=>item.show_type.type==item1.type)}
                                 style={{minHeight:"500px"}}
                                >
                                </ListContainer> 
                                )
                                

                            })
                        }
                       
                    </Tabs>
                    <WhiteSpace />
                    <WhiteSpace />
                    <WhiteSpace />
                </div>

            </div>
        )
    }
}
export default Home;