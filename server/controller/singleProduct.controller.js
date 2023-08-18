const ErrorHandler = require("../config/customErrorHandler.config");
const db=require("../config/mysql.config");
const singleProduct=(req,res,next)=>{
    const {id}=req.params;
    db.query(`select * from products where id="${id}"`,(err,result)=>{
        if(err){
            next(new ErrorHandler());
        }
        else if(result.length>0){
            res.status(200).send(result[0])
        }
        else{
            next(new ErrorHandler("Product Not Found",404));
        }
    })
}
module.exports=singleProduct;