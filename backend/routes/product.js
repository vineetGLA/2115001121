const express=require('express');
const router=express.Router();
const {allProducts,singleProduct}=require('../controller/product');

router.get('/categories/:categoryname/products',allProducts)
router.get('/categories/:categoryname/products/:productid',singleProduct);

module.exports=router;