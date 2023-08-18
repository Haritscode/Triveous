const ErrorHandler = require("../config/customErrorHandler.config");
const bcrypt=require("bcryptjs");
const db=require("../config/mysql.config");
const { request } = require("express");
const login=(req,res,next)=>{
    const {email,password}=req.body;
    db.query(`select uid,first_Name,last_Name,email,password from user where email="${email}"`,(err,result)=>{
        if(err){
            next(new ErrorHandler());
        }
        else{
            if(result.length>0){
                if(bcrypt.compareSync(password,result[0].password)){
                    req.userInfo=result[0]
                    next();
                }
                else{
                    next(new ErrorHandler("Invalid Credentials",422))
                }
            }
            else{
                next(new ErrorHandler("User Not Found",404))
            }
        }
    })
}
module.exports=login;