// 链接数据库 

const mongoose = require('mongoose');

const hostname = "0.0.0.0";
const port = 27017;
const dbName = "react"

const DB_CONN_STR = `mongodb://${hostname}:${port}/${dbName}`;

// 链接数据库  代码
mongoose.connect(DB_CONN_STR, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("mongodb 数据库链接成功...")
})

connection.on('open', function() {
    console.log('mongodb 已经链接 open 开启 ');
});

connection.on('error', function(err) {
    console.log('Mongoose connection 异常: ' + err);
});

connection.on('disconnected', function() {
    console.log('mongodb 断开链接  ');
});

module.exports = connection;