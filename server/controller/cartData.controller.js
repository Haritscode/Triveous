const ErrorHandler = require('../config/customErrorHandler.config');
const db=require('../config/mysql.config');
const cartData=(req,res,next)=>{
    const { uid }=req.userInfo;
    let {productId,quantity}=req.body;
    db.query(`INSERT INTO cart (userId, createdAtTimeStamp,productId,quantity)
    VALUE ("${uid}",${Date.now()},${productId},${quantity})`,(err,values)=>{
        if(err)
        {
            console.log(err);
            next(new ErrorHandler())
        }
        else{
            if(values.affectedRows===1)
            {
                res.status(201).send({msg:"Order Created"})
            }
        }
    })
}
module.exports=cartData;