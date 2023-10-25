const {Recepie}=require('../models/recepie.js');
const mongoose = require('mongoose')

exports.getaddRecepie=async (req,res,next)=>{
    var temp = new  Recepie(title, ingredients, description, image, cookingTime, calories,upvote,downvote, createdAt, updatedAt);
    console.log("Response: ", await temp.addRecepie());
    res.send("addRecepie"); 
}
exports.postaddRecepie=async (req,res,next)=>{
    const {title, author, description, image, cookingTime, calories, ingredients, instructions, createdAt, updatedAt} = req.body;
    console.log(title, author, description, image, cookingTime, calories, ingredients, instructions, createdAt, updatedAt);
    const temp = new Recepie(title, author, description, image, cookingTime, calories, ingredients, instructions, createdAt, updatedAt);
    console.log("Response: ", await temp.addRecepie());
    res.send("addRecepie"); 
}
exports.updateRecepie=async (req,res,next)=>{
    try {
        const { newData, filter } = req.body;
        const updatedRecepie = await Recepie.updateRecepie(filter, newData);
        
        console.log(updatedRecepie);
  
        if (updatedRecepie) {
            console.log("RETURN WORKING");
            res.status(201).json({ message: "Recepie updated successfully" });
        } else {
            console.log("MATHI KALI");
            res.status(404).json({ message: "Recepie not found" });
        }
        
        } catch (error) {    
            console.log("Error Here");
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
    }
}

exports.deleteRecepie=async (req,res,next)=>{
    // var newData = {'name': "definitely batli"};
    // var filter = {"_id":'6511670846cb4764af1433f5'};
    const _id  = req.query._id;
    console.log({_id});
    const filter = {_id};
    Recepie.deleteRecepie(filter);
    // // var bol = await Recepie.updateRecepie(filter, newData);
    // console.log(bol);
    // if (bol ){
    //     console.log("RETURN WORKING");
    // } else {
    //     console.log("MATHI KALI");
    // }
    res.send("deleted recepie");
}

exports.findRecepieById = async (req,res,next) =>{
    // id parameter madhun ghyavi lagel
    const {id} = req.query;
    console.log(id);
    try{
        const recepie = await Recepie.findRecepieById(id);
        console.log("IN controller")
        console.log(recepie);
        if(!recepie){
            return res.status(404).send('Recepie not found');
        }
        // console.log(recepie)
        return res.send(recepie);
    }
    catch(error){
        console.log(error);
        return  res.status(500).send('Error finding recepie by ID')
    }
}

exports.apisortbyrank=async (req,res,next)=>{
    Recepie.sortbyrank()
    .then(sortedRecipes=>{
      res.send(sortedRecipes);
    })
    .catch(err=>{
      console.log(err)
    });
}