const {Router}=require("express");
const allProducts=require("../controller/products.controller");
const categoryProducts=require("../controller/categoryProduct.controller")
const singleProduct=require('../controller/singleProduct.controller');
const searchProduct=require('../controller/searchProduct.controller');
const categoriesList=require('../controller/categorieList.controller');
const router=Router();
router.get('/',allProducts);
router.get('/search',searchProduct);
router.get('/categories',categoriesList)
router.get("/:id",singleProduct);
router.get('/:category',categoryProducts);
module.exports=router;