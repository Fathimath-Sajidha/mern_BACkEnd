const express=require('express')
const { userLogin, userSignUp,authenticateToken } = require('../Controllers/userController')
const router=express.Router()
const USER=require('../Model/user')


router.post('/signup',userSignUp)
router.post('/login',userLogin)
router.get('/profile',authenticateToken) 

module.exports=router 