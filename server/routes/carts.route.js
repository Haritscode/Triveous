const {Router}=require('express');
const cartData=require("../controller/cartData.controller");
const userCart=require('../controller/userCart.controller');
const updateCartItem=require('../controller/updateCartItem.controller');
const removeCartItem=require("../controller/removeCartItem.controller")
const routes=Router();

routes.route('/').get(userCart).post(cartData)
routes.route('/:pid').put(updateCartItem).delete(removeCartItem);

module.exports=routes;