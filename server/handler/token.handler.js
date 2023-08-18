require("dotenv").config();
const jwt=require('jsonwebtoken');
const db=require('../config/mysql.config');
const ErrorHandler = require("../config/customErrorHandler.config");
const authToken=(req,res)=>{
    const {email,uid,first_Name,last_Name}=req.userInfo;
    const refreshToken=jwt.sign({uid},process.env.REFRESH_TOKEN,{expiresIn:'30d'})
    const accessToken=jwt.sign({uid,email},process.env.ACCESS_TOKEN,{expiresIn:'6h'})
    res.cookie('rtk',`Bearer ${refreshToken}`,{maxAge:1000*60*60*24*30}).cookie('atk',`Bearer ${accessToken}`,{maxAge:1000*60*60*6});
    res.status(200).json({email,name:`${first_Name} ${last_Name}`})
}
const verifyToken=(req,res,next)=>{
    let {atk,rtk}=req.cookies;
    atk=atk?.split(' ')[1];
    rtk=rtk?.split(' ')[1];
    if(atk){
        jwt.verify(atk,process.env.ACCESS_TOKEN,(err,decode)=>{
            if(err){
                next(new ErrorHandler('Unauthorized User',401));
            }
            else{
                req.userInfo=decode;
                next()
            }
        })
    }
    else if(rtk){
        jwt.verify(rtk,process.env.REFRESH_TOKEN,(err,decode)=>{
            if(err){
                next(new ErrorHandler('Unauthorized User',401));
            }
            else{
                const {uid}=decode;
                db.query(`select email from user where uid="${uid}"`,(err,result)=>{
                    if(err){
                        next(new ErrorHandler());
                    }
                    else if(result.length>0){
                        const accessToken=jwt.sign({email:result[0].email,uid},process.env.ACCESS_TOKEN,{expiresIn:'6h'});
                        res.cookie('atk',`Bearer ${accessToken}`,{maxAge:1000*60*60*6})
                        next()
                    }
                    else{
                        next(new ErrorHandler("Unauthorized User",401))
                    }
                })
            }
        })
    }
    else if(!atk && !rtk){
        next(new ErrorHandler("Unauthorized User",401));
    }
}
module.exports={authToken,verifyToken};