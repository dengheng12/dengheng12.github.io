import React from 'react';
import ReactDOM from 'react-dom';
// import '@/index.css';
import {axios} from "&"
import App from './App';
// import ImmutableDemo from "~/immutable";
// import ReduxDemo from "~/redux"
// import MainDemo from "~/react-redux"
import * as serviceWorker from './serviceWorker';
import '@/styles/index.scss';
ReactDOM.render( < App / > , document.getElementById('root'));
// {/* ReactDOM.render( <ReduxDemo/> , document.getElementById('root')); */}
console.log("good good study   主入口文件")

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();