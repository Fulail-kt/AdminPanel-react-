const express=require('express')
const route=express.Router()
require('dotenv').config();
const fs = require('fs');
const jwt=require('jsonwebtoken')
const User= require('../models/users')
const bcrypt=require('bcryptjs')





const multer=require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


route.post('/addUser', async (req, res) => {
    try {
      const { email, password, name } = req.body;
  
      let role=req.body.role
      
      if (!email || !password || !name) {
        return res.status(400).json({ status: 'error', message: 'All fields must be filled.' });
      }

      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
            console.log(existingUser,"dddddddddddddddd")
            return res.json({ status: 'error', message: 'User already exists with this email.' });
        }

      const cleanedName = name.replace(/\s+/g, ' ').trim();
  
     
  
      if (!cleanedName) {
        return res.status(400).json({ status: 'error', message: 'Name cannot be empty or contain only white spaces.' });
      }

      
  
      if (!role) {
        role = 'user'; 
      }
      const hashed=bcrypt.hashSync(password,5)

      const user = await User.create({ email, password:hashed, role, name: cleanedName });
  
      res.json({ status: 'ok', message: 'Registration successful. You can now log in.', user });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ status: 'error', message: 'An error occurred during user creation.' });
    }
  });
  
  
  
  
  route.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
  
      if (user) {

        const checkpassword= await bcrypt.compare(password,user.password)

        if (checkpassword) {
          const token = jwt.sign({
            name: user.name,
            email: user.email,
            role: user.role,
            id:user._id,
          }, 'secret123');
          return res.json({ status: 'ok', user: true,token:token });
        } else {
          return res.json({ status: 'error', user: false, message: 'Invalid password' });
        }
      } else {
        return res.json({ status: 'error', user: false, message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      return res.json({ status: 'error', message: 'An error occurred' });
    }
  });
  
  
  route.get('/getUsers', async (req, res) => {
    try {
      const token = req.headers.authorization;
      const tokenValue = token.split(' ')[1];
      const validToken = jwt.verify(tokenValue, "secret123");
  
      if (validToken.role !== 'admin') {
        return res.status(403).json({ status: 'error', message: 'Access denied' });
      }
  
      const users = await User.find({});
      res.status(200).json({ status: 'ok', users });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });
  
  route.patch('/editUser/:id', async (req, res) => {
    const { name, email, password, role } = req.body;
    const userId = req.params.id;
  
    try {
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields must be filled.' });
      }
  
      
      const trimmedName = name.trim();
  
      if (!trimmedName) {
        return res.status(400).json({ error: 'Name cannot be empty or contain only white spaces.' });
      }
  
      const hashed=bcrypt.hashSync(password,5)
      const user = await User.findByIdAndUpdate(userId, {
        name: trimmedName,
        email,
        password:hashed,
        role,
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ status: 'ok', message: 'successfully updated user', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  route.delete('/deleteUser/:id',async(req,res)=>{
  
    
    try {
      const id=req.params.id
  
      const deleteUser=await User.findByIdAndDelete(id)
  
      if(!deleteUser){
        return res.json({status:'error',message:'user not found'})
      }
  
      return res.json({status:'ok',message:'Succesfully deleted user '})
  
    } catch (error) {
      console.log(error.message)
      return res.json({status:'error',message:error.message})
    }
  })
  
  
  route.get('/userInfo',async(req,res)=>{
    try {
  
      const token = req.headers.authorization;
      const id =req.headers.value
      console.log(token,id)
      const tokenValue = token.split(' ')[1];
      const validToken = jwt.verify(tokenValue, "secret123");
  
      if(validToken){
        
  
        const userData=await User.findById(id)
  
        console.log(userData)
  
        res.json({status:'ok',userData})
  
      }
      
    } catch (error) {
      console.log(error.message)
    }
  })
  
  route.patch('/profileUpdate',upload.single('file'),async(req,res)=>{
  
    try {
      console.log('dddddddd')
      if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'File not uploaded' });
      }
  
      const userId = req.body.userId;
      const user = await User.findById(userId);
      const oldProfilePicture = user.profile;
  
     await User.findByIdAndUpdate(userId, { profile: req.file.filename });
  
     if (oldProfilePicture) {
      fs.unlink(`public/images/${oldProfilePicture}`, (err) => {
        if (err) {
          console.error(`Error deleting old profile picture: ${err.message}`);
        }
      });
    }
  
      res.json({ status: 'ok', message: 'Profile successfully uploaded',profile:req.file.filename });
  
    } catch (error) {
      console.log(error.message)
    }
  })
  









module.exports=route