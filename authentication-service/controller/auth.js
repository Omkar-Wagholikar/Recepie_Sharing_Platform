const { User } = require('../models/usermodel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_KEY="your_secret_key_here"
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
        if(obj){
            return res.status(409).send("emailID is already registered");
        }

        //Encrypting password
        encryptedPassword = await bcrypt.hash(password,10);
        
        //Creating new user
        const newUser = await new User (firstname,lastname,phone,email,encryptedPassword);
        newUser.addUser();
        
        //*****************************ASK Omkar****************************************************
        //create token
        // const token = jwt.sign({user_id:newUser._id,email},process.env.TOKEN_KEY,{expiresIN:"2h",});
        // //sava user token
        // newUser.token = token;

        //return new user
        res.status(201).json(newUser);
        console.log(newUser);
    }
    catch(err){
        console.log(err);
    }
}

exports.postlogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!(email && password)){
            res.status(400).send("ALL input is required");
        }
        const user=await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            //console.log(user);
            const token=jwt.sign({user_id: user._id,email},
                //process.env.TOKEN_KEY,
                TOKEN_KEY,
                {
                    expiresIn:"2h",
                }
            );
            //console.log(token,"hhuuhuuh");
            //user.token=token;
            const cookieOptions={
                expiresIn: new Date(Date.now()+ 90*24*60*60*1000),
                //httpOnly:true
            }
            res.cookie("userRegistered",token,cookieOptions);
            return  res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    }
    catch(err){
        console.log(err);
    }
}

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