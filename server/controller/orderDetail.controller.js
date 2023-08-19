const ErrorHandler = require("../config/customErrorHandler.config");
const db=require("../config/mysql.config");
const orderDetail=(req,res,next)=>{
    const {oid}=req.params;
    const {uid}=req.userInfo;
    const query='select products,createdAt from orders where userId=? and id=?'
    db.query(query,[uid,oid],(err,values)=>{
        if(err){
            next(new ErrorHandler());
        }
        else if(values.length>0){
            res.status(200).json(values[0])
        }
        else{
            next(new ErrorHandler("No Order Found",404));
        }
    })
}
module.exports=orderDetail;