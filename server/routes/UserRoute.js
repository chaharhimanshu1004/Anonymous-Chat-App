const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const userModel = require('../model/UserModel');
require('dotenv').config();

router.post('/register',async(req,res)=>{
    try{
        const {name,email} = req.body;
        if (!email.endsWith('bennett.edu.in')) {
            return res.status(400).json({ error: 'Invalid email domain. Only bennett.edu.in is allowed.' });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered.' });
        }
        const count = await userModel.countDocuments({});
        const username = `Anonymous${count+1}`;
        const password = Math.random().toString(36).slice(-8);
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new userModel({
            name,
            email,
            username,
            password: hashedPassword,
        });
        await user.save();
        sendMail(email, username, password);
        res.status(201).json({ message: 'User registered successfully. Check your email for login details.' });

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function sendMail(email, username, password){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'himanshuchahar208@gmail.com',
            pass: process.env.PASS
        }
    })
    const mailOptions = {
        from:'himanshuchahar208@gmail.com',
        to:email,
        subject:'Hello broo!',
        text:`username: ${username} and password :${password}`
    }
    try{
        const result = await transporter.sendMail(mailOptions);
        console.log('Email Sent Successfully!!')
    }catch(err){
        console.log('Cant send the mail bcz: ',err);
    }
}

router.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    console.log(username);
    try{
        const user = await userModel.findOne({username});
        if(!user){
            return res.json({message:"user doesn't exists"});
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.json({message:"Password doesn't match"})
        }
        const token = jwt.sign({id:user._id},process.env.SECRET);
        res.json({token,userID:user._id});

    }catch(err){
        console.error(error);
        res.status(500).json({ message: "Error while Loggin In!!" });
    }
})
router.post('/setImage',async(req,res)=>{
    const {username,imageUrl} = req.body;
    try{
        const user = await userModel.findOne({username});

        user.imageUrl = imageUrl;
        await user.save();
        res.status(200).json({ message: "Image set successfully!" });

        
    }catch(err){
        console.error(error);
        res.status(500).json({ message: "Error while setting the image!!" });
    }
})

module.exports = router;