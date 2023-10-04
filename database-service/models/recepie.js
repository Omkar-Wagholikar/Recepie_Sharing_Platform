const mongoose = require('mongoose');
const { mongoConnect } = require('../database/database.js');

// mongoConnect('recepies');

const recepieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    ingredients: {
        type: Array,
        required: true
    },
    category: {
        type: Boolean,
        required: true
    },
    user:{
        type: String,
        required: true
    },
    steps:{
        type:String,
        required: false
    }
})

const RecepieModel = mongoose.model('Recepie', recepieSchema);

class Recepie{
    constructor(recepieName, ingredients, category, user, steps){
        this.recepieName = recepieName;
        this.ingredients = ingredients;
        this.category = category;
        this.user = user;
        this.steps = steps;
    }

    async addRecepie(){

        const tempRecepie = new RecepieModel({
            name: this.recepieName,
            ingredients: this.ingredients,
            category: this.category,
            user: this.user,
            steps: this.steps
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
}

module.exports = {
    Recepie
};