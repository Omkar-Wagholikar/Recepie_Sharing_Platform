const mongoose = require('mongoose');
const { mongoConnect } = require('../database/database.js');

mongoConnect('user');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type : String,
        required:true
    },
    token : {
        type:String,
        required:true
    }

})

const userModel = mongoose.model('user',userSchema);

class User{
    constructor(firstname,lastname,phone,email,password){
        this.firstname = firstname;
        this.lastname = lastname,
        this.phone=phone,
        this.email=email,
        this.password=password
    }
    static async findOne(data) {
        console.log("Func not exisitng error");
    }
}

module.exports={
    User
}