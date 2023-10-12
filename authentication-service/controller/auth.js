const { User } = require('../models/usermodel');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

dotenv.config();
exports.getRefresh = async(req,res) =>{
    return res.send("hello world");
}

exports.postregister=async(req,res)=>{
    try{
        const {firstname,lastname,phone,email,password} = req.body;
        console.log(req.body)
        console.log("First Name:", firstname);
        console.log("Last Name:", lastname);
        console.log("Phone:", phone);
        console.log("Email:", email);
        console.log("Password:", password);

        if(!firstname || !lastname || !phone || !email || !password){
            return res.status(400).send("Enter required data");
        }
        
        const obj = await User.findOne(email);
        
        //check if email already exists
        // ==============================================
        if(obj){
            return res.status(409).send("emailID is already registered");
        }

        //Encrypting password
        encryptedPassword = await bcrypt.hash(password,10);
        
        //Creating new user
        const newUser = new User (firstname,lastname,phone,email,encryptedPassword);

        //return new user
        newUser.addUser();
        console.log("New user added");
        return res.status(201).json(newUser);
    }
    catch(err){
        console.log(err);
    }
}

exports.postlogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!(email && password)){
            console.log("Here")
            return res.status(400).send("ALL input is required");
        }
        const user=await User.findOne(email);
        if(user && (await bcrypt.compare(password,user.password))){
            const token=jwt.sign({user_id: user._id,email},
                "TOKEN_KEY"
            );
            user.token=token;
            console.log(`Success for ${email}`);
            return res.status(200).json({token});
        }
        console.log("400 here");
        return res.status(400).send("Invalid Credentials");
    }
    catch(err){
        console.log(err);
    }
}
// please explain how to use this
exports.verifyToken=async (req,res)=>{
    const token= req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
    try{
        const decoded=jwt.verify(token,process.env.TOKEN_KEY);
        req.user=decoded;
    }
    catch(err){
        return res.status(401).send("Invalid Token");
    }
    return next();
}