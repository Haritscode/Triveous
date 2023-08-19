const ErrorHandler = require("../config/customErrorHandler.config");
const db=require("../config/mysql.config");
const removeCartItem=(req,res,next)=>{
    const {pid}=req.params;
    const {uid}=req.userInfo;
    db.query(`delete from cart where userId="${uid}" and productId="${pid}"`,(err,result)=>{
        if(err){
            next(new ErrorHandler());
        }
        else if(result.affectedRows===1)
        {
            res.status(200).send({msg:'item removed from cart'})
        }
        else{
            next(new ErrorHandler("product not found on cart",404))

        }
    })
}
module.exports=removeCartItem;