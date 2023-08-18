const ErrorHandler = require("../config/customErrorHandler.config");
const db=require("../config/mysql.config");
const allProducts=(req,res,next)=>{
    let {limit=20,page=1}=req.query;
    db.query("select count(*) as count from products",(err,count)=>{
        if(err){
            next(new ErrorHandler())
        }
        else{
            db.query(`select * from products limit ${limit} offset ${(page<=0?0:page-1)*limit}`,(err,value)=>{
                if(err){
                    next(new ErrorHandler())
                }
                else{
                    if(value.length>0)
                    {
                        res.status(200).send({products:value,totalCount:count[0].count,page:parseInt(page)})
                    }
                }
            })
        }
    })
}
module.exports=allProducts;