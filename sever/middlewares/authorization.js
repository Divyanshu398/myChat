const jwt = require('jsonwebtoken')
require("dotenv").config();
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
         return   res.json({error:"Unauthorised user"})
        }

        const {id} = payload
        // res.json(id)
        next()
        
        
    })
}