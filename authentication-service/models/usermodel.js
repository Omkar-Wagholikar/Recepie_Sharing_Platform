const mongoose = require('mongoose');
const { mongoConnect } = require('../database/database.js');

mongoConnect('user');

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      password: {
        type: String,
      },
      profilePicture: { type: String, default: "" },
      favorites: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Recipe",
        },
      ],
      roles: {
        type: [String],
        default: ["BasicUser"],
      },
      isDisabled: { type: Boolean, default: false },
      refreshToken: { type: [String] },
    },
    {
      timestamps: true,
    }
  );

const userModel = mongoose.model('user',userSchema);

class User{
    constructor(firstname,email,password){
        this.firstname = firstname;
        // this.lastname = lastname,
        // this.phone=phone,
        this.email=email,
        this.password=password
    }
    static async findOne(data) {
        return await userModel.findOne({email: data});
    }

    async addUser(){
        const tempComment = new userModel({
            firstname: this.firstname,
            // lastname : this.lastname,
            // phone : this.phone,
            email : this.email,
            password : this.password,
            token:"123"
        })

        return await tempComment.save().then(data => {
            console.log("Added User");
            console.log(data);
            return true;
        }).catch(e => {
            console.log(e);
            return false;
        });
    }
}

module.exports={
    User
}