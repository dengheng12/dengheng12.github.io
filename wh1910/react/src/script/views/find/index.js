import "./index.scss";
import React,{Component} from "react";
import Head from "../../components/head"
import { MySwipe } from "../../components/swiper";
import ListContainer from "~/components/findlist";
const SwipeItem = MySwipe.Item;

export default class Classify extends Component{
    state={
        imgs:[
            {
            img:'http://shihuo.hupucdn.com/appHome/201812/1300/0767ee290a165c7c519696b8c047436c.jpg?imageView2/2/w/750/h/268/interlace/1',
            a:"http://www.shihuo.cn/article/detail/21874.html#qk=banner&order=5"
            },
            {
                img:'http://shihuo.hupucdn.com/appHome/201812/0920/b42ed3c3eca82633072c47a1bf3b53a9.jpg?imageView2/2/w/750/h/268/interlace/1',
                a:"http://www.shihuo.cn/article/detail/22124.html#qk=banner&order=1"
            },
            {
                img:'http://shihuo.hupucdn.com/appHome/201811/1200/843bce9c5e893f33ccb55e1e7acd61fd.jpg?imageView2/2/w/750/h/268/interlace/1',
                a:"http://www.shihuo.cn/article/detail/18891.html#qk=banner&order=2"
            
            },
            {
                img:'http://shihuo.hupucdn.com/appHome/201812/1023/736a64832b272c088c9fe01837b0ac4e.jpg?imageView2/2/w/750/h/268/interlace/1',
                a:"http://www.shihuo.cn/article/detail/21874.html#qk=banner&order=3"
            },
            {
                img:'http://shihuo.hupucdn.com/appHome/201812/0900/d31d0002502c7181c272e5bac796375e.jpg?imageView2/2/w/750/h/268/interlace/1',
                a:"http://shihuo.hupucdn.com/appHome/201812/0900/d31d0002502c7181c272e5bac796375e.jpg?imageView2/2/w/750/h/268/interlace/1#qk=banner&order=4"
            }
        ]
    }
    render(){
        return(
            <div>
                <Head title="发现"></Head>
                <div>
                    <MySwipe
                        id="find"
                        options={{ loop: false, autoplay: { delay: 1500 }, speed: 1200, pagination: { el: '.swiper-pagination' } }}
                    >
                        {
                            this.state.imgs.map((item, idx) => {
                                return (
                                    <SwipeItem key={idx} id="find-item">
                                        <a href={item.a}>
                                        <img src={item.img} className="f-img" alt="" />
                                        </a>
                                    </SwipeItem>
                                )
                            })
                        }

                    </MySwipe>
                </div>
                <div className="list">
                    <ul>
                        <li>
                            <span className="iconfont icon-xinrenzhongce"></span>
                            <p>众测</p>

                        </li>
                        <li>
                        <span className="iconfont icon-lanmu"></span>
                            <p>栏目</p>
                        </li>
                        <li>
                        <span className="iconfont icon-tubiao103"></span>
                            <p>最新</p>
                        </li>
                        <li>
                        <span className="iconfont icon-zuirezixun"></span>
                            <p>最热</p>
                        </li>
                    </ul>
                </div>
                <div className="hot">
                    <h2>热门话题</h2>
                    <ul>
                        <li>
                            <img src="http://shihuo.hupucdn.com/column/201811/2215/2e79d7e6da19d652db2c54020574701e.jpg"></img>
                        </li>
                        <li>
                            <img src="http://shihuo.hupucdn.com/appHome/201811/1020/95e951e28bf1a30b58c03204e11e16a6.jpg"></img>
                        </li>
                        <li>
                            <img src="http://shihuo.hupucdn.com/column/201812/2919/08a6f969e4e07d33209b8ba948ed425c.png"></img>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 style={{padding:"10px",background:"#fff",fontSize:"20px"}}>今日推荐</h2>
                    <ListContainer dataType={"basketball"}></ListContainer>

                </div>
            </div>
        )
    }
}