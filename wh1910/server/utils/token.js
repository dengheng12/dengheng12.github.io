var jwt=require("jsonwebtoken");
const serect = "wuhan1910-daydayup";
exports.createToken=function(tel){
   return jwt.sign(tel,serect)
 
}

const decodeToken=function(token){
    return new Promise(function(resolve,reject){
        jwt.verify(token,serect,function(err,data){
            if(err){
                console.log(err);
                reject(err)
            }else{
                resolve(data);
            }
        })
    })
}

exports.decodeToken = decodeToken; 


exports.getTel=function(req,res,callback){
    var token=req.headers.token;
    console.log(token);
    if(token){
        console.log(decodeToken(token))
        decodeToken(token).then(tel=>{
            callback(tel);
        }).catch(err=>{
            res.json({
                code:"3000",
                msg:"token验证失败",
                err,
                type:0
            })
        })
    }else{
        res.json(
            {
            code:"3000",
            msg:"token不存在,请重新登录",
            type:0
        }
        )
    }
}
