const ErrorHandler = require('../config/customErrorHandler.config');
const db=require('../config/mysql.config');
const userCart=(req,res,next)=>{
    const {uid}=req.userInfo;
    db.query(`select p.*,c.quantity from products p left join cart c on c.productId=p.id left join user u on u.uid=c.userId where u.uid="${uid}" order by createdAtTimeStamp asc`,(err,values)=>{

        if(err){
            next(new ErrorHandler())
        }
        else if(values.length>0)
        {
            res.status(200).send(values)
        }
        else{
            next(new ErrorHandler("No Item Found Yet",404))
        }
    })
}
module.exports=userCart;