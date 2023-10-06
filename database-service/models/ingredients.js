const mongoose = require('mongoose');
const { mongoConnect } = require('../database/database.js');

// mongoConnect('ingredients');

const IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    unit:{
        type: String,
        required:true,
    },
    
})

const IngredientModel= mongoose.model('Ingredient', IngredientSchema);

class Ingredient{
    constructor(ingredientName,quantity,unit){
        this.ingredientName=ingredientName;
        this.quantity=quantity;
        this.unit=unit;
    }
    async addIngredient(){
        const tempobj = new IngredientModel({
            name: this.ingredientName,
            quantity:this.quantity,
            unit:this.unit,
        });
        return await tempobj.save().then(data => {
            console.log("Success");
            console.log(data);
            return true;
        }).catch(e => {
            console.log(e);
            return false;
        });
    }

    static async updateIngredient(filter, newData){
        return await IngredientModel.findOneAndUpdate(filter, newData).then(data => {
            console.log("Success");
            console.log(data);
            return true;
        }).catch(e => {
            console.log("error");
            console.log(e);
            return false;
        });
    }

    static async deleteIngredient(objId){
        return await IngredientModel.deleteOne(objId).then(data => {
            console.log("Success");
            console.log(data);
            return true;
        }).catch(e => {
            console.log("error");
            console.log(e);
            return false;
        });
    }

    static async findIngredients(name){
        return await IngredientModel.find({ $or: [{ name: { $regex: new RegExp(name) } }] })
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((error) => {
          console.error(error);
          return error;
        });
    }
}

module.exports = {
    Ingredient
};