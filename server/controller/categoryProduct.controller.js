const ErrorHandler = require("../config/customErrorHandler.config");
const db=require("../config/mysql.config");
const categoryProducts=(req,res,next)=>{
    const {category}=req.params;
    const {limit=10,page=1}=req.query;
    console.log({limit,page});
    db.query(`select count(p.id) as count from products as p left join categories as c on c.id=p.category_id where c.category="${category}"`,(err,count)=>{
        if(err){
            next(new ErrorHandler());
        }
        else if(count){
            db.query(`select p.* from products as p left join categories as c on c.id=p.category_id where c.category="${category}" limit ${limit} offset ${(page<=0?0:page-1)*limit}`,(err,value)=>{
                if(err){
                    next(new ErrorHandler());
                }
                else{
                    if(value.length>0)
                    {
                        res.status(200).json({...value,totalCount:count[0].count,page:parseInt(page)})   
                    }
                    else{
                        res.status(404).send({msg:"No Product Found"})
                    }
                }
            })
        }
    })
}
module.exports=categoryProducts;