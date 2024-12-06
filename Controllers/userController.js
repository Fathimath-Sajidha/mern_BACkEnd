const express=require('express')
const {user} = require('../store')
const USER=require('../Model/user')
const getAllUsers = (req, res, next) => {
    res.status(200).json({ data: user });
};

const getParticularUser = (req, res, next) => {
    const userId = parseInt(req.params.id);
    let userFound = null;
    
    for (let i = 0; i < user.length; i++) {
        if (user[i].id === userId) {
            userFound = user[i];
            break;
        }
    }

    if (userFound) {
        res.status(200).json({ data: userFound });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
const addUser=(req,res,next)=>{
    const newUser={
        id:user.length+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password
    };
    user.push(newUser);
    res.status(201).json({message:'new user added successfully',data:newUser});
}
const updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { first_name, last_name, email, password } = req.body;

    
    const userFound = user.find(u => u.id === userId);

    if (!userFound) {
        return res.status(404).json({ message: 'User not found' });
    }

    
    console.log('Before update:', user);

   
    Object.assign(userFound, { first_name, last_name, email, password });

    
    console.log('After update:', userFound);

    
    res.status(200).json({ message: 'User updated successfully', data: userFound });
};

const userLogin=(req,res,next)=>{
    console.log(req.body)
    if(username===req.body.username){
       if(password===req.body.password){
        res.status(200).json({message:'login successful'})
       }
       else{
        res.status(403).json({message:'invalid credentials'})
       }
    }
    else {
        res.status(403).json({message:'invalid credentials'})
    }

   
}

const userSignUp = (req, res) => {
    const { name, age, email, Rollno } = req.body; 
console.log(req.body)
    
     USER({
        name:req.body.username,

        
        email: req.body.email,
        password:req.body.password
    }).save()  
    .then((resp) => {
        res.status(200).json({
            message: 'sign up successful',
            data: resp 
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            message: 'sign up failed',
            error: err
        });
    });
};



module.exports={userLogin,userSignUp,getAllUsers,getParticularUser,addUser,updateUser,userSignUp}