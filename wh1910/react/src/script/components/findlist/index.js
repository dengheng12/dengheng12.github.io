
import React,{ Component } from 'react'
import ReactDOM from 'react-dom'    //下拉刷新组件依赖react-dom，所以需要将其引进来
import {connect} from "react-redux";
import {getFindAsync} from "~/action";
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
@connect(
  state=>{
    console.log(state);
    return{
        find:state.getIn(["data","find"]),
    }
  }
)


class ListContainer extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    if(!this.props.find.length>0){
      this.props.dispatch(getFindAsync(
      {url:"/react/find",
       cb(){
         console.log("cb")
       }
    }))
    }
      

    
    
    console.log(this.props)
    const{
      dispatch,
      find,
      count
    }=this.props;

    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    // setTimeout(() => {
      this.rData = { ...this.props.find };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    // }, 1000);
  }

  render() {
    const{
      dispatch,
      ball,
      count
    }=this.props;
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
        <div key={rowID} style={{ padding: '0 15px' }}>
          {
          rowData.data&& <a href={rowData.data.href}><div style={{display:"flex",padding:"10px"}}>
            <div className="left">
              <img src={rowData.data.avatar}></img>
            </div>
            <div className="right">
              <div className="title">
                <p className="name">{rowData.data.author_name}</p>
                <p className="time">{rowData.data.date}</p>
              </div>
              <div className="tits">
                  <p>
                      {rowData.data.title}
                  </p>
              </div>
              <p className="imgOne">
                <img src={rowData.data.img}></img>
              </p>
              <div className="tags">
                  <span className="iconfont icon-like">
                    <i>{rowData.data.praise}</i>
                  </span>
                  <span className="iconfont icon-say">
                      <i>{rowData.data.reply_count}</i>
                  </span>
              </div>
              
            </div>
            
           
          </div>
         </a>}
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
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
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
