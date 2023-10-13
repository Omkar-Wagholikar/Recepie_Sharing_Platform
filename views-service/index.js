// npx nodemon index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 5000;


const corsOptions = {
    origin: 'http://localhost:3000', // Set the exact origin you want to allow
    credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
  };
  
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '/assets')));
// app.use(cors());    	
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '/views'));
app.get('', (req, res) => {
    res.send("On Home Page somehow? ");
})
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})

app.use(bodyParser.json());

app.get("/blog", async(req, res) =>{
    console.log("blog called");
    res.send(JSON.stringify([{"_id":"64d40e261897aa8f62b65507","title":"The Magic of Mexican Tacos","author":{"_id":"64d0d45008af9a29268476a8","name":"Brian Scott","email":"brian.scott@abc.com","password":"$2b$10$0DqOe6atxuDCKJAATtNBo.26XtJ2kDW/vFdZ5tT0x8kOQOzZpvWU2","profilePicture":"","favorites":[],"roles":["BasicUser","ProUser"],"isDisabled":false,"refreshToken":["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQwZDQ1MDA4YWY5YTI5MjY4NDc2YTgiLCJpYXQiOjE2OTE1Mjg3MjYsImV4cCI6MTY5MTcwMTUyNn0.gHXWeLn1lMucf7ljEwJZLXhL5yDO0WkcXzrSJ3___qc"],"createdAt":"2023-08-07T11:24:00.491Z","updatedAt":"2023-08-08T21:05:26.134Z","__v":4},"description":"let magic unfold one bite at a time.","image":"https://images.pexels.com/photos/3642718/pexels-photo-3642718.jpeg?auto=compress&cs=tinysrgb&w=1080&dpr=1","ratings":[],"comments":[],"createdAt":"2023-08-09T22:07:34.398Z","updatedAt":"2023-08-10T13:56:16.185Z","__v":2}]))
})

app.get("/recipe", async(req, res) =>{
    console.log("recepie called");
    res.send(JSON.stringify([{"_id":"64d3efee1897aa8f62b65473","title":"Homemade Donuts","author":{"_id":"64d0d46808af9a29268476ab","name":"Peter William"},"description":"Donuts, also known as doughnuts, are a popular type of fried or baked pastry. They are typically round with a hole in the center, though there are various shapes and flavors available. The dough is made from ingredients like flour, sugar, yeast, and often eggs and milk, resulting in a soft and slightly sweet texture. Donuts are commonly enjoyed as a breakfast treat or a snack, and they have become a beloved staple of many cuisines around the world.","image":"https://images.pexels.com/photos/1191639/pexels-photo-1191639.jpeg?auto=compress&cs=tinysrgb&w=1080&dpr=1","cookingTime":"60","calories":"450.2","ingredients":["2 1/4 cups all-purpose flour","1/2 cup granulated sugar","2 teaspoons baking powder","1/2 teaspoon salt","1/2 cup milk","1/4 cup unsalted butter, melted","1 large egg","1 teaspoon vanilla extract","Vegetable oil, for frying","Powdered sugar, for dusting"],"instructions":["In a large mixing bowl, whisk together the all-purpose flour, granulated sugar, baking powder, and salt.","In a separate bowl, whisk together the milk, melted unsalted butter, egg, and vanilla extract.","Gradually add the wet ingredients to the dry ingredients, stirring until just combined. Do not overmix.","Cover the bowl with plastic wrap and refrigerate the dough for at least 30 minutes.","On a floured surface, roll out the chilled dough to about 1/2-inch thickness.","Using a donut cutter or a glass, cut out donut shapes and use a smaller cutter or a bottle cap to cut out the donut holes in the center.","Heat vegetable oil in a deep pot or a deep fryer to 350°F (175°C).","Carefully lower the donuts into the hot oil, frying a few at a time, but not overcrowding the pot.","Fry the donuts for 1-2 minutes per side or until they are golden brown and cooked through.","Use a slotted spoon to remove the donuts from the oil and place them on a paper towel-lined plate to drain excess oil.","While the donuts are still warm, dust them with powdered sugar.","Enjoy these delicious homemade donuts with your favorite coffee or tea!"],"ratings":[{"user":"64d4dab779d519ec5b5fd61a","rating":4.75,"_id":"64d4ed2b79d519ec5b5fd67e"},{"user":"64dfe5662b9d56b392e6f779","rating":3,"_id":"64e07d8a859eaf08919bf2df"}],"comments":[],"createdAt":"2023-08-09T19:58:38.845Z","updatedAt":"2023-08-19T08:30:32.453Z","__v":4},
    {
        "_id": "64d3efee1897aa8f62b65478",
        "title": "Strawberry Glazed Donuts",
        "author": {
          "_id": "64d0d46808af9a29268476b0",
          "name": "David Johnson"
        },
        "description": "Delight in the sweet and fruity flavor of strawberry glazed donuts.",
        "image": "https://images.pexels.com/photos/2826850/pexels-photo-2826850.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "cookingTime": "55",
        "calories": "400.2",
        "ingredients": ["2 1/4 cups all-purpose flour", "1/2 cup granulated sugar", "2 teaspoons baking powder", "1/2 teaspoon salt", "1 cup milk", "1/4 cup unsalted butter, melted", "1 large egg", "1 teaspoon vanilla extract", "1 cup fresh strawberries, pureed", "Vegetable oil, for frying", "Strawberry glaze"],
        "instructions": ["In a large mixing bowl, combine the all-purpose flour, granulated sugar, baking powder, and salt.", "In another bowl, mix the milk, melted unsalted butter, egg, and vanilla extract until well combined.", "Add the pureed fresh strawberries to the wet ingredients.", "Gradually add the wet ingredients to the dry ingredients, stirring until just combined. Do not overmix.", "Cover the bowl with plastic wrap and let the batter rest for 1 hour.", "Heat vegetable oil to 350°F and carefully drop the batter using a spoon into the oil.", "Fry the donuts until they turn golden brown.", "Dip the warm donuts in strawberry glaze.", "Enjoy the delightful strawberry glazed donuts!"],
        "ratings": [{"user": "64d4dab779d519ec5b5fd61f", "rating": 4.5}],
        "comments": [{"user": {"_id": "65231c24d8d38f7e92b85a75", "name": "Christopher Williams", "profilePicture": ""}, "comment": "The strawberry glaze is superb!", "date": "2023-10-14T21:08:37.860Z"}],
        "createdAt": "2023-08-09T19:58:38.845Z",
        "updatedAt": "2023-10-14T21:19:26.013Z",
        "__v": 9
      }     
]))
})

app.get("/recipe/:id", async (req, res) => {
    console.log("recipe called");
    const id = req.query.id;
    console.log("id:", id);
    return res.send(JSON.stringify(
        {
            "_id": "64d3efee1897aa8f62b65478",
            "title": "Strawberry Glazed Donuts",
            "author": {
              "_id": "64d0d46808af9a29268476b0",
              "name": "David Johnson"
            },
            "description": "Delight in the sweet and fruity flavor of strawberry glazed donuts.",
            "image": "https://images.pexels.com/photos/2826850/pexels-photo-2826850.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            "cookingTime": "55",
            "calories": "400.2",
            "ingredients": ["2 1/4 cups all-purpose flour", "1/2 cup granulated sugar", "2 teaspoons baking powder", "1/2 teaspoon salt", "1 cup milk", "1/4 cup unsalted butter, melted", "1 large egg", "1 teaspoon vanilla extract", "1 cup fresh strawberries, pureed", "Vegetable oil, for frying", "Strawberry glaze"],
            "instructions": ["In a large mixing bowl, combine the all-purpose flour, granulated sugar, baking powder, and salt.", "In another bowl, mix the milk, melted unsalted butter, egg, and vanilla extract until well combined.", "Add the pureed fresh strawberries to the wet ingredients.", "Gradually add the wet ingredients to the dry ingredients, stirring until just combined. Do not overmix.", "Cover the bowl with plastic wrap and let the batter rest for 1 hour.", "Heat vegetable oil to 350°F and carefully drop the batter using a spoon into the oil.", "Fry the donuts until they turn golden brown.", "Dip the warm donuts in strawberry glaze.", "Enjoy the delightful strawberry glazed donuts!"],
            "ratings": [{"user": "64d4dab779d519ec5b5fd61f", "rating": 4.5}],
            "comments": [{"user": {"_id": "65231c24d8d38f7e92b85a75", "name": "Christopher Williams", "profilePicture": ""}, "comment": "The strawberry glaze is superb!", "date": "2023-10-14T21:08:37.860Z"}],
            "createdAt": "2023-08-09T19:58:38.845Z",
            "updatedAt": "2023-10-14T21:19:26.013Z",
            "__v": 9
          }            
    ))
})

const authRouter=require('./routes/view');

app.use(authRouter);

app.get('*', (req, res) => {
    res.send("Route not matching or matching too early");
})