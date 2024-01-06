const express = require('express');
const router = express.Router();
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
module.exports = router;