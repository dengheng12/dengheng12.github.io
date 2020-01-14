import "./index.scss"
import React,{Component} from "react";

import Head from "../../components/head";
import {history} from "../../../utils"

import { Modal,Toast} from "antd-mobile";
const alert = Modal.alert;

const showAlert = (that) => {
    const alertInstance = alert('警告', '我们将会调用你的相机', [
      { text: '取消', onPress: () => history.go(-1) },
      { text: '同意', onPress: () =>  Toast.success('谢谢同意', 1)  },
    ]);
    setTimeout(() => {
      // 可以调用close方法以在外部close
      console.log('auto close');
      alertInstance.close();
    }, 500000);
  };


  export default class Scan extends Component{

    componentWillMount(){
        showAlert(this);
    }

    render(){
        return (
            <div>
                <Head title="扫一扫" show={true}  scan={true}></Head>
                <h2>扫一扫</h2>
            </div>
        )
    }
}
        