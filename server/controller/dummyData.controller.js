const axios=require("axios");
const db=require("../config/mysql.config");
const ErrorHandler = require("../config/customErrorHandler.config");
const dummyData=(req,res,next)=>{
    axios.get(`https://dummyjson.com/products?limit=100`).then((result)=>{
        result.data.products.map((item,count)=>{
            setTimeout(()=>{
                const image=JSON.stringify(item.images)
                db.query(`insert ignore into categories (category) value ("${item.category}")`,(err,data)=>{
                    if(err){
                    next(new ErrorHandler())
                }
                else{
                    db.query(`select id from categories where category="${item.category}"`,(err,result)=>{
                        if(err){
                            next(new ErrorHandler());
                        }
                        else{
                            db.query(`insert into products (category_id,title,description,price,discountPercentage,rating,stock,brand,thumbnail,images) value ("${result[0].id}","${item.title}","${item.description}","${item.price}","${item.discountPercentage}","${parseInt(item.rating)}","${item.stock}","${item.brand}","${item.thumbnail}",'${image}')`,(err,result)=>{
                                if(err){
                                    next(new ErrorHandler())
                                }
                                else{
                                    console.log(`${image}`);
                                    if(count===99){
                                        res.status(200).json({msg:"data uploaded successfully"})
                                }
                            }
                            })
                        }
                    })  
                }
            })
        },2000*count)
    })
    }).catch(err=>{
        // console.log({err});
    })
}
module.exports=dummyData;