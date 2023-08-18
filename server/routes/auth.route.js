const {Router}=require('express');
const registerUser = require("../controller/register.controller");
const login = require('../controller/login.controller');
const { authToken } = require('../handler/token.handler');
const route=Router();
route.post('/register',registerUser,authToken),
route.post('/login',login,authToken)
module.exports=route;