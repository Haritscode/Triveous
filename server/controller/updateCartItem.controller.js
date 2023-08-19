const ErrorHandler = require("../config/customErrorHandler.config");
const db=require("../config/mysql.config");
const updateCartItem=(req,res,next)=>{
    const {uid}=req.userInfo;
    const {pid}=req.params;
    const {quantity}=req.body;
    db.query(`update cart set quantity=${quantity}  where userId="${uid}" and productId="${pid}"`,(err,result)=>{
        if(err){
            next(new ErrorHandler())
        }
        else if(result.affectedRows===1){
            res.status(200).send({msg:"update success"})
        }
        else{
            next(new ErrorHandler("Product not added to your cart!",404));
        }
    })
}
module.exports=updateCartItem;