const {Recepie}=require('../models/recepie.js');

exports.getaddRecepie=async (req,res,next)=>{
    var temp = new  Recepie(req.params.rname, ["a", "b"], false, "someone", "none");
    console.log("Response: ", await temp.addRecepie());
    res.send("addRecepie"); 
}
exports.postaddRecepie=async (req,res,next)=>{
    const {name,ingredients,category,user,steps} = req.body;
    const temp = new Recepie(name,ingredients,category,user,steps);
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
    var newData = {'name': "definitely batli"};
    var filter = {"_id":'6511670846cb4764af1433f5'};
    var bol = await Recepie.updateRecepie(filter, newData);
    console.log(bol);
    if (bol ){
        console.log("RETURN WORKING");
    } else {
        console.log("MATHI KALI");
    }
    res.send("update recepie");
}