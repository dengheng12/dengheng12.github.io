import "./index.scss";
import React,{Component} from "react";
import {
    NavBar,  //导航栏
    Icon,   //图标
    Popover,   //气泡
    ActionSheet //动作面板

}from "antd-mobile";

import {history} from "../../../utils"
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
const Item = Popover.Item;
export default class Head extends Component{
    gotosearch(){
        console.log(111)
        history.push("/search")
    }
   
    state={
        visible:false,
    }
    render(){
       console.log(history)
        const{
            title,
            show,
            seacher,
            scan,
            login
        }=this.props;
        return(
            <div>
                <NavBar
                mode="light"
                icon={show&&<Icon type="left" />}
                onLeftClick={() =>history.go(-1)}
                rightContent={[
                     !seacher&&<Icon key="0" type="search" style={{ marginRight: '16px' }  } onClick={this.gotosearch}/>,
                    <Pop scan={this.props.scan} login={this.props.login } key={1}> </Pop>,
                ]
                    
                   
                }
                >{title}
                </NavBar>
            </div>
    
        )
    }
    
}



class Pop extends Component{
    state={
        visible:false,
        selected:""
    }

    onSelect=(opt)=>{
        console.log(opt.props.value);
        var val=opt.props.value;
        if(val=="scan"){
         history.push("/scan")
        }else if(val=="photo"){
           this.showActionSheet()
        }
 
    }
    handleVisibleChange=(visible)=>{
        this.setState({
            visible
        })
    }
    gotologin(){
        console.log("login");
        history.push("/login")
      }
      showActionSheet = () => {
        const BUTTONS = ['拍照', '从手机相册中选择', '使用相机', '删除', '取消'];
        ActionSheet.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: BUTTONS.length - 1,
          destructiveButtonIndex: BUTTONS.length - 2,
          // title: 'title',
          message: 'I am description, description, description',
          maskClosable: true,
          'data-seed': 'logId',
          wrapProps:{
            onTouchStart: e => e.preventDefault(),
          }
        },
        (buttonIndex) => {
          this.setState({ clicked: BUTTONS[buttonIndex] });
        });
      }
      render(){
          const{
              scan,
              login
          }=this.props;
          return(
            <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visible}
            overlay={[
              (!scan&&<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId" >扫一扫</Item>),
              (<Item key="5" value="photo" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>拍照</Item>),
              (!login&&<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{ marginRight: 5 }} onClick={this.gotologin}>登录</span>
              </Item>),
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
            
          </Popover> 
             
          )
      }
 
}






