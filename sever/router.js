const express = require("express");
require("dotenv").config();
const jwt = require('jsonwebtoken')
const router = express.Router();
const mongoose = require('mongoose')
const ModelUser = require('./models/User')
const ModelChatroom = require('./models/Chatroom')
const ModelMessage = require('./models/Message')
const bcrypt = require('bcryptjs')
const authorization = require('./middlewares/authorization')

router.get("/", (req, res) => {
  res.send('server is up ad running');
});

router.get("/allchatrooms",authorization, (req, res) => {
  ModelChatroom.find().then((data)=>{
    res.json(data)

  })
  .catch((err)=>{
    console.log(err)
  })
});


router.get("/chatrooms",authorization, (req, res) => {
  ModelChatroom.find().limit(3).then((data)=>{
    res.json(data)

  })
  .catch((err)=>{
    console.log(err)
  })
});

router.post("/chatrooms",authorization, (req, res) => {
  var {name} = req.body
  if(!name){
    return res.json({error:"Please add name of chatroom"})}

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) return res.json({error:"Chatroom name can contain only alphabets"})

  ModelChatroom.findOne({name:name}).then((savedRoom)=>{
    if(savedRoom){
      return res.json({error:"Chatroom already exist"})
    }
    var chatroom = new ModelChatroom({
      name: name
    })
    chatroom.save().then((result)=>{
      res.json({message:"Chatroom created successfully"})

    })
    .catch(err=>{
      console.log(err)
    })

  })
  .catch(err=>{
    console.log(err)
  })
  
});

router.get("/join",authorization, (req, res) => {
  res.send('protected resource');
});

router.post('/login',(req,res)=>{
  var {email, password} = req.body;
  if(!email || !password){
    return res.json({error:"please add email or password"})}

  ModelUser.findOne({email:email})
  .then(savedUser=>{
      if(!savedUser){
         return res.json({error:"Invalid Email or password"})
      }
      var getPassword = savedUser.password

      if(bcrypt.compareSync(password,getPassword)){
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
       res.json({ "message":"user logged in successfully",
       "userID":savedUser._id,
       "username":savedUser.name,
         token:token})
      }
      else{
  
        return res.json({error:"Invalid Email or password"})
  
      }
  })
})


router.post('/register', function(req,res,next){
  var {name, email, password} = req.body;
  
  if(!email || !password || !name){
    return res.json({error:"please add all the fields"})
  }
  
  var emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
  if (!emailRegex.test(email)) return res.json({error:"Email is not supported from your domain"});
  if (password.length < 6) return res.json({error:"Password must be atleast 6 character long"});
  ModelUser.findOne({email:email}).then((savedUser)=>{
    if(savedUser){
      return res.json({error:"user already exists with that email"})
    }
    password = bcrypt.hashSync(password,10)
    var newUser = new ModelUser({
      name:name,
      email:email,
      password:password
    })
    newUser.save()
    .then(() => res.json({
      message: "User Registered Successfully!"
    }))
    .catch(err=>{
      console.log(err)
  })

  }).catch(err=>{
    console.log(err)
  })
  

})


module.exports = router;