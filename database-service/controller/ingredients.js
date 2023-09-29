// const Ingredient=require('../models/ingredients');
const bodyParser = require('body-parser');
const { Ingredient }=require('../models/ingredients.js');

exports.getaddIngredient=async (req,res,next)=>{
    var temp=new Ingredient(req.params.rname,req.params.rquantity,req.params.runit);
    console.log("Response: ", await temp.addIngredient());
    res.send("addIngredient"); 
}

exports.postaddIngredients = async (req,res,next) =>{
    const {name,quantity,unit} = req.body;
    const temp = new Ingredient(name,quantity,unit);
    console.log("Response: ",await temp.addIngredient());
    res.send("addIngredient");
}

exports.updateIngredient=async (req,res,next)=>{
    var temp=new Ingredient(req.params.rname,req.params.rquantity,req.params.runit);
    console.log("Response: ", await temp.addIngredient());
    res.send("addIngredient");
}

exports.putupdateIngredient=async (req, res) => {
    try {
        const { newData, objId } = req.body;
        // var newData = {'name': "notBatli"};
        // var objId = {'_id':'6511670846cb4764af1433f5'};
        const updatedIngredient = await Ingredient.updateIngredient(objId, newData);
        
        console.log(updatedIngredient);
  
        if (updatedIngredient) {
            console.log("RETURN WORKING");
            res.status(201).json({ message: "Ingredient updated successfully" });
        } else {
            console.log("MATHI KALI");
            res.status(404).json({ message: "Ingredient not found" });
        }
        
        } catch (error) {    
            console.log("Error Here");
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
    }
}

exports.findIngredient = async(req, res) => {
    console.log("name is" + req.query.name);
    var temp = await Ingredient.findIngredients(req.query.name);
    res.send(temp);
}

exports.deleteIngredient=async (req,res,next)=>{
    try {
        const {objId } = req.body;
        // var objId = {'_id':'6511670846cb4764af1433f5'};
        console.log(objId)
        const updatedIngredient = await Ingredient.deleteIngredient(objId);
        
        console.log(updatedIngredient);
  
        if (updatedIngredient) {
            console.log("RETURN WORKING");
            res.status(201).json({ message: "Ingredient deleted successfully" });
        } else {
            console.log("MATHI KALI");
            res.status(404).json({ message: "Ingredient not found" });
        }
        
        } catch (error) {    
            console.log("Error Here");
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
    }
}