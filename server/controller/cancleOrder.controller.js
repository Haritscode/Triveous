const ErrorHandler = require('../config/customErrorHandler.config');
const db=require('../config/mysql.config')
const cancleOrder=(req,res,next)=>{
    const {uid}=req.userInfo;
    const {oid}=req.params;
    const {status}=req.body;
    db.query(`update orders set orderStatus="${status}" where userId="${uid}" and id=${oid}`,(err,result)=>{
        if(err){
            next(new ErrorHandler());
        }
        else if(result.affectedRows===1){
            res.status(200).json({msg:`${status} Order`})
        }
    })
}
module.exports=cancleOrder;