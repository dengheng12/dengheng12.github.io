var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var zheng_schema = new Schema({
    id: Number,
    haspromotionTag: Boolean,
    img: String,
    version: String,
    nm: String,
    preShow: Boolean,
    sc: Number,
    globalReleased: Boolean,
    wish: Number,
    star: String,
    rt: String,
    showInfo: String,
    showst: Number,
    wishst: Number
})

exports.Zheng = mongoose.model("zheng", zheng_schema);

var coming_schema = new Schema({
    id: Number,
    haspromotionTag: Boolean,
    img: String,
    version: String,
    nm: String,
    preShow: Boolean,
    sc: Number,
    globalReleased: Boolean,
    wish: Number,
    star: String,
    rt: String,
    comingTitle: String,
    showst: Number,
    wishst: Number
})
exports.Coming = mongoose.model("coming", coming_schema);



var comingb_schema = new Schema({
    id: Number,
    img: String,
    wish: Number,
    wishst: Number,
    nm: String,
    comingTitle: String
});

exports.Comingb = mongoose.model("comingb", comingb_schema);



var user_schema = new Schema({
    username: String,
    tel: Number,
    password: String,
    dbpwd: String,
    time: String,
    pic: String
});

exports.User = mongoose.model("user", user_schema);


//react code
var code_schema = new Schema({
    tel: Number,
    code:Number,
    time: Date,
    pic:String
});

exports.Code = mongoose.model("code", code_schema);



var basketball_schema=new Schema({
    show_type:String,
    data:Object
})
exports.Basketball=mongoose.model("basketball",basketball_schema);

var data_schema=new Schema({
    show_type:Object,
    data:Object
})
exports.Data=mongoose.model("data1",data_schema);

var find_schema=new Schema({
    show_type:String,
    data:Object

})
exports.Find=mongoose.model("find",find_schema);



var shopcar_schema = new Schema({
    tel:Number,
    goodId:String,
    goodInfo:Object,
    time:Date,
    count:Number,
    checked:Boolean,
    shou:Boolean
})
exports.Shopcar = mongoose.model('shopcar',shopcar_schema);



var shou_schema=new Schema({
    tel:Number,
    goodId:String,
    goodInfo:Object,
    time:Date,
    shou:Boolean
})
exports.ShouList = mongoose.model('shou',shou_schema);