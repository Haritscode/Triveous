const ErrorHandler = require('../config/customErrorHandler.config');
const db=require('../config/mysql.config');
const searchProduct=(req,res,next)=>{
    const {q}=req.query;
    db.query(`select * from products where title like "${q}%" || brand like "${q}%"`,(err,result)=>{
        if(err){
            next(new ErrorHandler())
        }
        else if(result.length>0){
            res.status(200).json(result)
        }
        else{
            res.status(404).send({msg:`No Product Found Like "${q}"`})
        }
    })
}
module.exports=searchProduct;