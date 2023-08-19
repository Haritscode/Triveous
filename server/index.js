require('dotenv').config();
const express=require("express");
const cors=require("cors");
const app=express();
const errorHandler=require("./handler/errorhandler.handler");
const auth=require("./routes/auth.route");
const cookieParser=require("cookie-parser");
const { verifyToken } = require('./handler/token.handler');
const products=require('./routes/products.route');
const carts=require("./routes/carts.route");
const orders=require('./routes/orders.route');
require("./config/mysql.config").connect(err=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server Connected Successfully");
    }
});
const port=process.env.PORT || 4000;
app.use(cors({
    origin:['localhost:3000','*'],
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:true,
    Credential:true,
}))
app.use(cookieParser())
app.use(express.json())
app.use('/auth',auth);
app.use(verifyToken)

app.get("/",(req,res)=>{
    res.status(200).send({msg:"Hello message"})
})
app.use("/products",products)
app.use("/carts",carts);
app.use("/orders",orders)
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`server Running at port ${port}`);
})
