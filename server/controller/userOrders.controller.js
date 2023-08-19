const ErrorHandler = require('../config/customErrorHandler.config');
const db=require('../config/mysql.config');
const userOrders=(req,res,next)=>{
    const {uid}=req.userInfo;
    const {sort="desc",limit=5,page=1}=req.query;
    db.query(`select count(*) as orderCount from orders where userId="${uid}"`,(err,count)=>{
        if(err)
        {
            next(new ErrorHandler());
        }
        else if(count[0].orderCount>0){
            db.query(`select products,createdAt,orderStatus from orders where userId="${uid}" order by createdAtTimeStamp ${sort} limit ${limit} offset ${(page<1?0:page-1)* limit}`,(err,result)=>{
                if(err){
                    next(new ErrorHandler())
                }
                else if(result.length>0)
                {
                    let resultData=[];
                    result.map(item=>{
                        resultData.push(item);
                    })
                    resultData.push({totalCount:count[0].orderCount})
                    res.status(200).send(resultData)
                }
            })
        }
        else{
            next(new ErrorHandler("No Orders found",404))
        }
    })
}
module.exports=userOrders;