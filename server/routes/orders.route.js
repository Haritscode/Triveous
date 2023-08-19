const {Router}=require('express');
const userOrders = require("../controller/userOrders.controller")
const createOrder = require('../controller/createOrder.controller');
const orderDetail=require("../controller/orderDetail.controller");
const cancleOrder = require('../controller/cancleOrder.controller');
const routes=Router();

routes.route('/').get(userOrders).post(createOrder);
routes.route('/:oid').get(orderDetail).put(cancleOrder)
module.exports=routes;