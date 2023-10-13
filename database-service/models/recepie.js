const mongoose = require('mongoose');
const { mongoConnect } = require('../database/database.js');

// mongoConnect('recepies');

const recepieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    cookingTime: { type: String, required: true },
    calories: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    ratings:{
        type:[
            {
                user:{
                    type:String,
                    required:true
                },
                rating:{
                    type:String,
                    required:true
                }
                
            }
        ]
    },
    comments:{  
        type:[
            {
                user:{
                    name:{
                        type:String,
                        required:true
                    },
                    profilePicture:{
                        type:String,
                        required:true
                    } 
                },
                comment:{
                    type:String,
                    required:true
                },
                date:{
                    type:Date,
                    required:true
                }
                
            }
        ]
        ,
        required:false
    },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  });

const RecepieModel = mongoose.model('Recepie', recepieSchema);

class Recepie{
    
  constructor(title, author, description, image, cookingTime, calories, ingredients, instructions, createdAt, updatedAt) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.image = image;
    this.cookingTime = cookingTime;
    this.calories = calories;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.ratings = [];  // Initialize ratings as an empty array
    this.comments = [];  // Initialize comments as an empty array
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async addRecepie() {
    const tempRecepie = new RecepieModel({
      title: this.title,
      author: this.author,
      description: this.description,
      image: this.image,
      cookingTime: this.cookingTime,
      calories: this.calories,
      ingredients: this.ingredients,
      instructions: this.instructions,
      ratings: this.ratings,
      comments: this.comments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });

    return await tempRecepie.save().then(data => {
      console.log("Success");
      console.log(data);
      return true;
    }).catch(e => {
      console.log(e);
      return false;
    });
  }


    static async updateRecepie(filter, newData){
        return await RecepieModel.findOneAndUpdate(filter, newData).then(data => {
            console.log("Success.");
            console.log(data);
            return true;
        }).catch(e => {
            console.log("error.");
            console.log(e);
            return false;
        });
    }
    static async deleteRecepie(objId){
        return await RecepieModel.deleteOne(objId).then(data => {
            console.log("Success");
            console.log(data);
            return true;
        }).catch(e => {
            console.log("error");
            console.log(e);
            return false;
        });
    }
    static async findRecepieById(id){
        return await RecepieModel.findById(id).then(data=>{
            console.log("success");
            // console.log(data);
            return data;
        }).catch(e => {
            console.log("error");
            console.log(e);
            return false;
        });
    }
}

module.exports = {
    Recepie
};