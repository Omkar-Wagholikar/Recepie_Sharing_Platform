// npx nodemon index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const { Recepie } = require('./models/recepie.js');
const { Ingredient }=require('./models/ingredients.js');
const { Comment } = require('./models/comments.js');

const RecepieController=require('./controller/recepie.js');
const IngredientController =require('./controller/ingredients.js');
const CommentController=require('./controller/comments.js');

const port = 3000;

app.use(express.static(path.join(__dirname, '/assets')));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '/views'));
app.get('', (req, res) => {
    res.send("On Home Page somehow? ");
})
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})

app.use(bodyParser.json());

// app.use((req, res) => {
//     console.log("Runs every time a request is received");
//     // res.send("Response text");
// });

// const { temp } = require('./database/database.js');
app.get("/ejs", (req,res) => {
    res.render("home.ejs", { ...jsonData });
})

// =====================================Ingredient Block==================================
app.post('/addIngredient',IngredientController.postaddIngredients);

app.get("/findIngredient", IngredientController.findIngredient);

app.put('/updateIngridient', IngredientController.putupdateIngredient);

app.put('/deleteIngredient', IngredientController.deleteIngredient);

// =====================================Recepie Block=====================================
// app.get('/addRecepie/:rname/:ing', RecepieController.getaddRecepie);

// app.post('/addRecepie',RecepieController.postaddRecepie);

// ========================================comment Block==================================

app.get('/addComment/:uname', async (req, res) =>{
    const currdate = new Date();
    var temp = new Comment(req.params.uname,10,5,"lai bhari",currdate);
    console.log("Response: ", await temp.addComment());
    res.send("addComment"); 
})
 
app.post('/addComment',async (req,res) =>{
    const {username,upvote,downvote,comment,createdAt} = req.body;
    const parsedDate = new Date(createdAt);
    const temp = new Comment(username,upvote,downvote,comment,parsedDate);
    console.log("Response: ",await temp.addComment());
    res.send("addComment");
})

// ======================================================================================

app.put('/updateRecepie', async (req, res) => {
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
  });

app.put('/updateComment', async (req, res) => {
    try {
        const { newData, objId } = req.body;
        //     var newData = {'name': "notBatli"};
        //     var objId = {'_id':'6511670846cb4764af1433f5'};
        const updatedComment = await Comment.updateComment(objId, newData);
        
        console.log(updatedComment);
  
        if (updatedComment) {
            console.log("RETURN WORKING");
            res.status(201).json({ message: "Comment updated successfully" });
        } else {
            console.log("MATHI KALI");
            res.status(404).json({ message: "Comment not found" });
        }
        
        } catch (error) {    
            console.log("Error Here");
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/deleteRecepie', async(req, res) =>{
    var objId = {"_id":'6511670846cb4764af1433f5'};
    var bol = await Recepie.deleteRecepie(objId);
    console.log(bol);
    if (bol ){
        console.log("RETURN WORKING");
    } else {
        console.log("MATHI KALI");
    }
    res.send("delete recepie");
})

app.get('*', (req, res) => {
    res.send("Route not matching or matching too early");
})