const ErrorHandler = require("../config/customErrorHandler.config");
const db=require("../config/mysql.config");
const createOrder=(req,res,next)=>{
    const {uid}=req.userInfo;
    let products=req.body || [];
    if(products?.length>0){
        products=JSON.stringify(products)
        const createdAtTimeStamp=Date.now();
        const query='insert into orders (userId,products,createdAtTimeStamp) value (?,?,?)';
        db.query(query,[uid,products,createdAtTimeStamp],(err,result)=>{
            if(err){
                next(new ErrorHandler());
            }
            else if(result.affectedRows===1){
                res.status(200).send({msg:"Success"})
            }
            else{
                next(new ErrorHandler())
            }
        });
    }
    else{
        next(new ErrorHandler("Order Items Empty",406))
    }
}
module.exports=createOrder;