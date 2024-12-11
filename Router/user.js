const express=require('express')
const { getAllUsers, getParticularUser, addUser, updateUser, userSignUp } = require('../Controllers/userController')
const router=express.Router()
const USER=require('../Model/user')

router.get('/',getAllUsers)
router.get('/:id',getParticularUser)
router.post('/add',addUser)
router.put('/:id',updateUser)
router.post('/signup',userSignUp)
router.post('/login',(req,res)=>{
    console.log(req.body);
     
    USER.findOne({name:req.body.name}).then((data)=>{


    }).catch((err)=>{
        console.log(err);
        
    })
})

module.exports=router 