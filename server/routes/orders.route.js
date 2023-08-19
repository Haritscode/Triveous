const {Router}=require('express');
const userOrders = require("../controller/userOrders.controller")
const createOrder = require('../controller/createOrder.controller');
const routes=Router();

routes.route('/').get(userOrders).post(createOrder)

module.exports=routes;