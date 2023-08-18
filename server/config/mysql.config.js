require("dotenv").config();
const mysql=require("mysql2");
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
}).setMaxListeners(10);
module.exports=db;