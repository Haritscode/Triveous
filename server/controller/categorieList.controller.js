const ErrorHandler = require('../config/customErrorHandler.config');
const db=require('../config/mysql.config');
const categoriesList=(req,res,next)=>{
    db.query('select * from categories',(err,value)=>{
        if(err){
            next(new ErrorHandler())
        }
        else if(value.length>0){
            res.status(200).json(value)
        }
        else{
            res.status(404).json({msg:"No Categories Found"});
        }
    })
}
module.exports=categoriesList;