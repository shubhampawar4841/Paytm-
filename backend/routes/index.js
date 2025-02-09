// backend/api/index.js
const express = require('express');
const zod= require("zod");
const {User} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const router = express.Router();


const signupBody=zod.object({
    username:zod.string().min(3).max(30),
    password:zod.string().min(6),
    firstName:zod.string().max(50),
    lastName:zod.string().max(50)
})

const signinBody=zod.object({
    username:zod.string().min(3).max(30),
    password:zod.string().min(6)
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    } 

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})

router.post("/signin", async (req, res) => {
    const {success}=signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if (!user) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET); 

    res.json({
        message: "User signed in successfully",
        token: token    
    })                
})   

 
 

module.exports = router;