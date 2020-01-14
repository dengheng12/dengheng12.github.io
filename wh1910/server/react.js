const express = require("express");
const router = express.Router();
var { sendCode } = require("./aly");
var axios = require("axios");
var { Code, Basketball, Find, Data, Shopcar ,ShouList} = require("./utils/schema");
var { createToken, decodeToken, getTel } = require("./utils/token");
var multer = require("multer");
router.get("/index", (req, res) => {
    res.send("这是react后台接口")
})


router.get("/json", (req, res) => {
    res.json({
        msg: "json数据测试成功",
        code: 200,
        obj: [{
            name: "小江",
            sex: "boy",
            age: 18,
            hobby: "唱"
        },
        {
            name: "小秦",
            sex: "boy",
            age: 20,
            hobby: "跳"
        },
        {
            name: "小刘",
            sex: "boy",
            age: 21,
            hobby: "rap"
        },
        {
            name: "小张",
            sex: "boy",
            age: 22,
            hobby: "篮球"
        }
        ]
    })
})


router.get("/mv", (req, res) => {
    axios({
        url: "https://m.maizuo.com/gateway?type=2&cityId=110100&k=1385439",
        methods: "GET",
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15728684694264902525372","bc":"110100"}',
            'X-Host': 'mall.cfg.common-banner'
        }
    }).then(result => {
        console.log(result.data)
        res.json({
            msg: "轮播图信息请求成功",
            code: 200,
            result: result.data
        })
    })

})

//生成验证码
function getCode() {
    return 1000 + Math.floor((10000 - 1000) * Math.random())
}
//发送验证码
router.post("/aly/sendSms", (req, res) => {
    var body = req.body;
    var code = getCode();
    console.log(body);
    if (body.tel) {
        sendCode(body.tel, code).then(result => {
            if (result.Message == "OK") {
                Code.findOne({ tel: body.tel }).then(tel => {
                    console.log(tel)
                    if (tel) {
                        Code.updateOne(
                            {
                                tel: body.tel,
                                code,
                                time: new Date()
                            }
                        ).then(data1 => {
                            res.json({
                                msg: "验证码发送成功",
                                code: 200,
                                params: code,
                                data1,
                                type: 1,
                            })
                        })


                    } else {
                        Code.insertMany(
                            {
                                tel: body.tel,
                                code,
                                time: new Date()
                            }
                        ).then(data => {
                            res.json({
                                msg: "验证码发送成功",
                                code: 200,
                                params: code,
                                data,
                                type: 1,
                            })
                        })

                    }
                })



            } else {
                res.json({
                    msg: "验证码发送失败",
                    code: 200,
                    type: 0,
                })

            }

        }).catch(err => {
            res.json({
                code: 200,
                msg: "服务器错误",
                type: 0
            })
        })

    } else {
        res.json({
            msg: "请先输入手机号",
            code: 200,
            type: 0
        })
    }

})


router.post("/checkCode", (req, res) => {
    var {
        tel,
        code
    } = req.body;
    Code.findOne({
        tel,
        code
    }).then(result => {
        if (result) {
            var time = new Date();
            if (time - result.time < 60 * 1000) {
                var token = createToken(tel);
                // req.session.tel = tel*1;
                // req.session.code = code*1;
                // req.session.token = token;
                // console.log(req.session)
                res.json({
                    code: 200,
                    msg: "验证码有效",
                    type: 1,
                    token
                })

            } else {
                res.json({
                    msg: "验证码失效，已过期",
                    code: 200,
                    type: 0
                })
            }
        } else {
            res.json({
                code: 200,
                msg: "验证码错误",
                type: 0

            })
        }
    })
})


router.post("/getTel", (req, res) => {
    var token = req.headers.token;
    console.log(token);
    if (token) {
        decodeToken(token).then(result => {
            console.log(result)
            res.json({
                code: 200,
                msg: "token 验证成功",
                result: result,
                type: 1,
            })
        }).catch(err => {
            res.json({
                code: "3000",
                msg: "token 验证失败",
                err,
                type: 0,
            })
        })
    } else {
        res.json({
            code: "3000",
            msg: "token不存在,请重新登录",
            type: 0
        })
    }
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
    console.log("uppppppppppppppppp");
    console.log(req.session)
    console.log(req.session.tel)
    getTel(req, res, (tel) => {
        Code.updateOne({ //根据手机号判断用户身份，更新数据库中的pic路径
            tel
        }, {
            $set: { pic: path }
        }).then(result => {
            console.log(result)
            res.json({
                msg: "头像上传成功",
                code: 200,
                pic: path,
                type: 1,
                tel
            })
        })
    })

})

//获取服务器头像
router.post("/getImg", (req, res) => {
    getTel(req, res, (tel) => {
        Code.findOne({ tel }).then(result => {
            console.log(result);
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

})


router.get("/find", (req, res) => {
    Find.find().then(result => {
        // console.log(result)
        res.json({
            msg: "获取发现数据",
            code: 200,
            result
        }
        )
    })
})

router.post("/addCar", (req, res) => {
    var body = req.body;
    console.log(body);
    const {
        count,
        goodId,
        goodInfo
    } = body;
    getTel(req, res, (tel) => {
        Shopcar.findOne({
            tel,
            goodId
        }).then(result => {
            if (result) {
                Shopcar.updateOne(
                    {
                        tel,
                        goodId
                    },
                    {
                        $inc: {
                            count: count
                        },
                        $set: {
                            time: new Date()
                        }
                    }
                ).then(data => {
                    res.json({
                        code: 200,
                        msg: "购物车商品数量更新成功",
                        result: data
                    })
                })
            } else {
                Shopcar.insertMany({
                    tel,
                    count,
                    time: new Date(),
                    goodId,
                    goodInfo
                }).then(ins => {
                    res.json({
                        code: 200,
                        msg: "购物车新增商品成功",
                        result: ins
                    })
                })

            }
        })
    })

})


router.get("/getCarList", (req, res) => {
    getTel(req, res, tel => {
        Shopcar.find({
            tel
        }).then(result => {
            res.json({
                code: 200,
                msg: "获取购物车列表成功",
                result
            })
        })
    })
})


router.post("/changeChecked", (req, res) => {
    const {
        checked,
        goodId
    } = req.body;
    getTel(req, res, tel => {
        var obj = { tel };
        if (goodId) {
            obj = {
                tel,
                goodId
            }
        }
        Shopcar.updateMany(obj, {
            $set: {
                checked: checked
            }
        }).then(result => {
            res.json({
                code: 200,
                msg: goodId ? "修改单条选中成功" : "修改全部选中成功",
                result
            })
        })
    })
})
//修改数量
router.post("/changeCount", (req, res) => {
    console.log(req.body)
    const {
        goodId,
        count,
        flag
    } = req.body;

    getTel(req, res, tel => {
        var obj = {}
        if (count) {
            obj = {
                $set: {
                    count
                }
            }
        } else {
            obj = {
                $inc: {
                    count: flag
                }
            }
        }
        Shopcar.updateOne({
            goodId,
            tel
        }, obj).then(result => {
            res.json({
                code: 200,
                msg: "修改商品数量成功",
                result
            })
        })

    })
})
// 删除 
router.post("/delSelect", (req, res) => {
    getTel(req, res, tel => {
        Shopcar.deleteMany({
            tel,
            checked: true
        }).then(result => {
            res.json({
                code: 200,
                msg: "删除购物车商品成功",
                result
            })
        })
    })
})


router.get("/getGoodList", (req, res) => {
    var limit = req.body.limit * 1 || 0;
    var keyword = req.query.keyword;
    var obj={}
    console.log(keyword)
    if(keyword){
        obj={
            $or:[
                {
                    'data.title':new RegExp(keyword,"ig")
                }
            ]
        }
    }
    Data.find(obj).limit(limit).then(result => {
        res.json({
            code: 200,
            msg: "获取商品列表成功",
            result
        })
    })
})
router.get("/getGoodTypes", (req, res) => {
    Data.distinct("show_type").then(result => {
        res.json({
            code: 200,
            msg: "获取商品分类成功",
            result
        })
    })
})


router.get("/getGoodInfo", (req, res) => {
    var query = req.query;
    console.log(query);
    var _id = query.goodsId;
    console.log(_id)
    if (_id) {
        Data.findOne({ _id }).then(result => {
            res.json({
                msg: "获取商品信息成功",
                code: 200,
                result: result

            })
        })
    } else {
        res.json({
            msg: "参数获取错误",
            code: 200
        }
        )
    }

})

router.post("/addShou", (req, res) => {
    var body = req.body;
    console.log(body);
    const {
        goodId,
        goodInfo
    } = body;
    getTel(req, res, (tel) => {
        ShouList.findOne({
            tel,
            goodId
        }).then(result => {
            if (result) {
                ShouList.updateOne(
                    {
                        tel,
                        goodId
                    },
                    {
                        $set: {
                            time: new Date()
                        }
                    }
                ).then(data => {
                    res.json({
                        code: 200,
                        msg: "添加收藏成功",
                        result: data
                    })
                })
            } else {
                ShouList.insertMany({
                    tel,
                    shou:true,
                    time: new Date(),
                    goodId,
                    goodInfo
                }).then(ins => {
                    res.json({
                        code: 200,
                        msg: "商品收藏表添加成功",
                        result: ins
                    })
                })

            }
        })
    })

})







router.get("/getshou",(req,res)=>{
    getTel(req,res,tel=>{
        ShouList.find({tel}).then(result=>{
            console.log(result)
        res.json({
            msg:"获取收藏列表成功",
            code:200,
            result
        })
       }
       )
    })
})

router.post("/delshou",(req,res)=>{
    var body=req.body;
    const {goodId}=body;
    getTel(req,res,tel=>{
        ShouList.deleteOne({tel,goodId}).then(result=>{
            res.json({
                msg:"取消收藏成功",
                code:200,
                result
            })

        })
    })
})
module.exports = router;