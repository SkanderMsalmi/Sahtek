const router =require('express').Router();
const apiRouter = require('./api');
const ProductResolvers = require("./shop/product/resolver");

 

module.exports= [
    ProductResolvers,
    
]
router.use('/api',apiRouter);

module.exports = router;