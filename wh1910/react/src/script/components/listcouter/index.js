// 因为它用react-dom做操作了，所以把react-dom也导进来
//  rowID是每次的ID，rowData是每次的数据
//  renderSseprator就是个分隔符
//  this.state.dataSource就是数据源 
//  外围的那个const的dataSource是一种数据结构，它有一个方法叫cloneWithRows
//  Button没用，删就完了
//  renderFooter是为了做上拉刷新时的Loading效果
//  第一步是通过dataSource去拿数据，第二步是通过render(row)去渲染那个模板
//  rowData是每一页的数据，就是每次装载进来的数据，rowID是它帮你封装好的，直接在key={rowID}用就行，
// 在DidMount整完数据以后在这边的rouData就是你的state.dataSource里面的数据(第一页)
//  renderSeparator 就是刚开始他们行和行之间的分隔符

//  pageSize是刷新的时候一次显示几条数据

import React, { Component } from 'react'
import ReactDOM from 'react-dom'    //下拉刷新组件依赖react-dom，所以需要将其引进来
import { Link } from 'react-router-dom'
// import {connect} from "react-redux";
// import {getBallAsync} from "~/action";
import { PullToRefresh, ListView } from 'antd-mobile';
import "./index.scss"

const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}
// @connect(
//   state=>{
//     console.log(state);
//     return{
//         ball:state.getIn(["data","ball"]),
//     }
//   }
// )


class ListContainer extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: false,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
    };
  }
  handleClick = () => {
    console.log(111)
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    // if(!this.props.ball.length>0){
    //   this.props.dispatch(getBallAsync(
    //   {url:"/react/basketball",
    //    cb(){
    //      console.log("cb")
    //    }
    // }))

    // }


    console.log(this.props)
    // const{
    //   dispatch,
    //   ball,
    //   count
    // }=this.props;

    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }
  onRefresh=(event)=>{
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.props.good };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
        reflashing:false
      });
    }, 1000);

  }
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      });
    }
  }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.props.good };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const {
      dispatch,
      ball,
      count,
    } = this.props;
    console.log(this.props)

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    // let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      console.log(rowData)
      return (
        <div key={rowID} style={{ padding: '0 15px' }} className="move-in" >
          {
            rowData.data && <Link to={"/detail?goodsId=" + rowData._id}><div style={{ display: "flex", padding: "10px" }}>
              <div
                style={{
                  lineHeight: '50px',
                  color: '#888',
                  fontSize: 16,
                  borderBottom: '1px solid #F6F6F6',
                }}
              > <img style={{ height: '102px', width: "102px", marginRight: '15px' }} src={rowData.data.img} alt="" /> </div>

              <div>
                <div className="title">{rowData.data.title}</div>
                {rowData.data.price && <div>
                  <div className="intro">
                    <img src="//sh1.hoopchina.com.cn/images/trademobile/quote_left.png"></img>
                    {rowData.data.intro}
                    <img src="//sh1.hoopchina.com.cn/images/trademobile/quote_right.png"></img>
                  </div>
                  <div className="foot">
                    <div className="left">
                      <span className="merchant">{rowData.data.merchant}</span>
                      <span className="price">￥{rowData.data.price}</span>
                    </div>
                    <div className="right">
                      <img src="//sh1.hoopchina.com.cn/images/trademobile/look.png"></img>
                      <span>{rowData.data.hits}</span>
                    </div>
                  </div>
                </div>}
                {!rowData.data.price && !rowData.data.subtitle &&<div>
                  <div className="center">
                    <img src={rowData.data.avatar}></img>
                    <span>{rowData.data.author_name}</span>
                  </div>
                  <div className="foot">
                    <div className="left">
                      <span className="name">{rowData.data.column_name}</span>
                    </div>
                    {rowData.data.hits && <div className="right">
                      <img src="//sh1.hoopchina.com.cn/images/trademobile/look.png" ></img>
                      <span>{rowData.data.hits}</span>
                    </div>}
                  </div>
                </div>}
                {
                  !rowData.data.price && rowData.data.subtitle &&<div>
                    <p style={{ color: 'red', padding: "10px 0" }}>{rowData.data.subtitle} </p>
                    <p>{rowData.data.column_name && <span
                      style={{
                        color: "#999",
                        fontSize: "8px",
                        border: "1px solid #a8a8a8",
                        padding: "0 3px",
                        maxWidth: "3rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginRight: "5px",
                        borderRadius:"2px"
                      }}>
                      {rowData.data.column_name}</span>}
                      <span style={{
                        color: "#999",
                        fontSize: "12px",
                      }}>{rowData.data.merchant}</span></p>
                  </div>
                }
              </div>
            </div></Link>
          }
        </div>
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : '已经到底部了'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={5}
        quickSearchBarTop
        useBodyScroll
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
      />
    );
  }

}

export default ListContainer
