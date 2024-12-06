const express=require('express')
const { getAllproducts, getParticularproduct, updateProduct, addProduct } = require('../Controllers/productController')
const router=express.Router()

router.get('/prodList',getAllproducts)
 router.get('/prodList/:id',getParticularproduct)
 router.post('/prodList/add',addProduct)
 router.put('/prodList/:id',updateProduct)

module.exports=router