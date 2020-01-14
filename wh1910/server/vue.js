var express = require("express");
var router = express.Router();
const { Zheng, Coming, Comingb, User } = require("./utils/schema");

const { aesEncrypt, keys } = require("./utils")
var multer = require("multer");



router.get("/index", (req, res) => {
    res.send("这是一次router测试");
})

router.post("/home", (req, res) => {
    res.json({
        msg: "post请求成功",
        code: 200,
        path: req.path
    })
})

router.get('/zheng', (req, res) => {
    Zheng.find().then(result => {
        res.json({
            msg: "正在上映数据获取成功",
            code: 200,
            result
        })
    })
})


router.get('/coming', (req, res) => {
    Coming.find().then(result => {
        res.json({
            msg: "即将上映数据获取成功",
            code: 200,
            result
        })
    })
})

router.get("/comingb", (req, res) => {
    Comingb.find().then(result => {
        console.log(result);
        res.json({
            msg: "获取轮播图信息成功",
            code: 200,
            result
        })
    })
})


router.post("/login", (req, res) => {
    var body = req.body;
    console.log(body);
    User.findOne({ tel: body.tel * 1 }).then(data => {
        if (data) {
            if (data.tel == body.tel * 1) {
                if (data.password == body.password) {
                    const str = body.tel + data.username;
                    const token = aesEncrypt(str, keys);
                    console.log(token);
                    req.session.token = token;
                    req.session.tel = body.tel * 1;
                    req.session.username = data.username;
                    console.log(req.session)
                    res.json({
                        msg: "登录成功",
                        code: 200,
                        type: 1,
                        token: token,
                        tel: body.tel
                    })
                } else {
                    res.json({
                        msg: "手机号或密码不正确，请重新登陆",
                        code: 200,
                        type: 0
                    })
                }
            }

        } else {
            res.json({
                msg: "手机号不存在，请重新输入",
                code: 200,
                type: 0
            })

        }
    })
})












router.post("/register", (req, res) => {
    var body = req.body;
    console.log(body);
    User.findOne({
        $or: [
            { username: body.username },
            { tel: body.tel * 1 }
        ]
    }).then(data => {
        if (data) {
            res.json({
                msg: "用户名或手机号已存在，请重新注册",
                code: 200,
                type: 0
            })
        } else {
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth() + 1;
            var day = time.getDate();
            var time1 = year + "-" + month + "-" + day;
            body.time = time1;
            body.tel = body.tel * 1;
            User.insertMany(body).then(result => {
                res.json({
                    msg: "注册成功,请登录",
                    code: 200,
                    type: 1,
                    tel: body.tel
                })
            })
        }
    })

})


//磁盘存储数据
var storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, "./public/upload"); //服务器上传文件地址
        },
        filename(req, file, cb) {
            cb(null, Date.now() + "touxiang" + file.originalname); //服务器文件命名
        }
    })
    //存储所有格式的文件
var upload = multer({ storage: storage }).any();



//上传头像到服务器  
router.post("/uploadImg", upload, (req, res) => {
    var path = req.files[0].path; //获取服务器端文件地址
    console.log("uppppppppppppppppp")
    User.updateOne({ //根据手机号判断用户身份，更新数据库中的pic路径
        tel: req.session.tel
    }, {
        $set: { pic: path }
    }).then(result => {
        res.json({
            msg: "头像上传成功",
            code: 200,
            pic: path,
            type: 1,
            tel: req.session.tel,
        })
    })
})

//获取服务器头像
router.post("/getImg", (req, res) => {
    User.findOne({ tel: req.session.tel }).then(result => {
        if (result.pic) {
            res.json({
                msg: "获取头像成功",
                code: 200,
                result,
                type: 1
            })
        } else {
            res.json({
                msg: "获取头像失败",
                code: 200,
                type: 0
            })
        }
    })
})

//根据手机号获取个人信息
router.get("/getinfo", (req, res) => {
        User.findOne({
            tel: req.session.tel
        }).then(result => {
            res.json({
                code: 200,
                msg: "获取个人信息成功",
                result
            })
        })
    })
    //根据手机号修改密码
router.post("/change", (req, res) => {
    var body = req.body;
    console.log(body);
    User.findOne({
        tel: body.tel * 1
    }).then(data => {
        console.log(data)
        if (data) {

            if (data.password == body.oldpwd) {
                User.updateOne({
                    tel: body.tel
                }, {
                    $set: {
                        password: body.newpwd
                    }
                }).then(result => {
                    res.json({
                        msg: "密码修改成功",
                        code: 200,
                        type: 1
                    })
                })

            } else {
                res.json({
                    msg: "密码输入错误，无法修改",
                    code: 200,
                    type: 0
                })
            }

        } else {
            res.json({
                msg: "手机号不存在",
                code: 200,
                type: 0
            })
        }
    })
})

module.exports = router;