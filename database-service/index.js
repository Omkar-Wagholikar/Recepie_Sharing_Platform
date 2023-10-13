// npx nodemon index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { mongoConnect } = require('./database/database.js');

mongoConnect('Recepie_Project');

const { Recepie } = require('./models/recepie.js');
const { Ingredient }=require('./models/ingredients.js');
const { Comment } = require('./models/comments.js');

const RecepieController=require('./controller/recepie.js');
const IngredientController =require('./controller/ingredients.js');
const CommentController=require('./controller/comments.js');

const port = 3001;

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
app.get('/addRecepie/:rname/:ing', RecepieController.getaddRecepie);

app.post('/addRecepie',RecepieController.postaddRecepie);

app.get('/deleteRecepie', RecepieController.deleteRecepie)

app.put('/updateRecepie', RecepieController.updateRecepie);

app.get('/findRecepie',RecepieController.findRecepieById)
// ========================================comment Block==================================

app.get('/addComment/:uname', CommentController.getaddComment);
 
app.post('/addComment',CommentController.postaddComment);

app.put('/updateComment', CommentController.updateComment);

// ======================================================================================


app.get('*', (req, res) => {
    res.send("Route not matching or matching too early");
})