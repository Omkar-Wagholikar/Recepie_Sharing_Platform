const { User } = require('../models/usermodel');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const { encodeBase64, decodeBase64 } = require('bcryptjs');
require('dotenv').config();

dotenv.config();
exports.getRefresh = async(req,res) => {
    console.log("refresh")
    // const cookies = req.cookies;
    // if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
    // console.log(cookies);
  
    // const refreshToken = "123";
  
    const foundUser = await User.findOne("abc@gmail.com");
    console.log(foundUser);
    // if (!foundUser) {
    //   return res.status(403).json({ message: "Forbidden" });
    // }
  
    // jwt.verify(
    //   refreshToken,
    //   process.env.REFRESH_TOKEN_SECRET,
    //   async (err, decoded) => {
    //     if (err || foundUser._id.toString() !== decoded.userId) {
    //       return res.status(403).json({ message: "Forbidden" });
    //     }
  
        const accessToken = jwt.sign(
          {
            UserInfo: {
              userId: foundUser._id.toString(),
              name: foundUser.name,
              email: foundUser.email,
              profilePicture: foundUser.profilePicture,
              roles: foundUser.roles,
              favorites: foundUser.favorites,
            },
          },
          "123",
          { expiresIn: "30m" }
        );
        console.log(jwtDecode(accessToken))
        res.json({ accessToken });

    //     res.json({ "accessToken":123 });
    // }
    // );
    
    // res.json({
    //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVaXN1TmFtZSI6IkRvZSIsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsInByb2ZpbGVQaWN0dXJlIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9wcm9maWxlUGljdHVyZS5qcGciLCJyb2xlcyI6WyJhZG1pbiJdLCJmYXZvcml0ZXMiOlsiYXZvciIsImJhciJdLCJpZCI6IjEyMyIsImlhdCI6MTYzMjYwNjE4NywiZXhwIjoxNjMyNjA3Nzg3fQ.Z-E01dTTNtS4BfW7D59La0W5vgL9b8z4zVwTQ8kCrRo",
    //     UserInfo:{
    //         userId: "foundUser._id.toString()",
    //         name: "foundUser.name",
    //         email: "foundUser.email",
    //         profilePicture: "foundUser.profilePicture",
    //         roles: "foundUser.roles",
    //         favorites: "foundUser.favorites"
    //     }
    // });
  };

exports.postregister=async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        console.log(req.body)
        console.log("First Name:", name);
        // console.log("Last Name:", lastname);
        // console.log("Phone:", phone);
        console.log("Email:", email);
        console.log("Password:", password);

        if(!name  || !email || !password){
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
        const newUser = new User (name,email,encryptedPassword);

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