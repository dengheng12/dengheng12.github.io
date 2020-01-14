var express = require("express");
var app = express();


var path = require("path");

var http = require("http");

const connection = require("./utils/connect")
const server = http.createServer(app);
const port = 2020;
const hostname = "0.0.0.0";

app.use(express.static(path.join(__dirname, 'public')));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cors = require("cors");
app.use(cors());

app.get("/index", (req, res) => {
    res.send("这是一次app测试")
})

// var session = require("express-session");
// app.use(session({
//     name: "my-server",
//     saveUninitialized: true,
//     secret: "test",
//     cookie: { maxAge: 1000 * 60 * 60 }, // session 保存时长  1hour 
//     resave: false
// }))
// const { checkToken } = require("./utils");
// // app.use(checkToken)
// const vueRouter = require("./vue");
// app.use("/vue", vueRouter);

const reactRouter = require("./react");
app.use("/react", reactRouter);


server.listen(port, hostname, () => {
    console.log(`my server is running at http://${hostname}:${port}`);
})