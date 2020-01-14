import "./index.scss";
import React, {Component} from "react";
import Head from "../../components/head";
import { SearchBar, WhiteSpace, WingBlank,NoticeBar } from "antd-mobile";
import {axios,history} from "&"
import ListContainer from "~/components/listcouter";
export default class Search extends Component{
    state={
        searchList:[]
    }
    handleSubmit=(keyword)=>{
        console.log(keyword);
        axios.get("/react/getGoodList",
        {params:
            {keyword}}
        ).then(res=>{
            this.setState({
                searchList:res.data.result
            })

        })
    }
    render(){
        const{
            location,
            histroy,
            match
        }=this.props;
        console.log(this.state.searchList)
        return(
            <div>
                <Head title="搜索" show={true} seacher={true}></Head>
                <div>
                    <WhiteSpace />
                    <WingBlank>
                        <SearchBar placeholder="自动获取光标" ref={ref => this.autoFocusInst = ref}  onSubmit={this.handleSubmit.bind(this)}/>
                    </WingBlank>
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                       友情提示，技术有限，查看搜索结果，需要手动下拉刷新，当然也可能没有搜索结果，请自行判断·····
                        </NoticeBar>
                   { this.state.searchList.length>0&&<ListContainer
                    good={this.state.searchList}
                    ></ListContainer>}
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.autoFocusInst.focus();
    }
}
