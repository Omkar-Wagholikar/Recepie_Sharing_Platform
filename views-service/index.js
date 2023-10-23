// npx nodemon index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');
const port = 5000;
const view=require('./controllers/view');

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

app.get("/blog/:id", async(req, res) =>{
  console.log("blog called");
  res.send(JSON.stringify([{"_id":"64d40e261897aa8f62b65507","title":"The Magic of Mexican Tacos","author":{"_id":"64d0d45008af9a29268476a8","name":"Brian Scott","email":"brian.scott@abc.com","password":"$2b$10$0DqOe6atxuDCKJAATtNBo.26XtJ2kDW/vFdZ5tT0x8kOQOzZpvWU2","profilePicture":"","favorites":[],"roles":["BasicUser","ProUser"],"isDisabled":false,"refreshToken":["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGQwZDQ1MDA4YWY5YTI5MjY4NDc2YTgiLCJpYXQiOjE2OTE1Mjg3MjYsImV4cCI6MTY5MTcwMTUyNn0.gHXWeLn1lMucf7ljEwJZLXhL5yDO0WkcXzrSJ3___qc"],"createdAt":"2023-08-07T11:24:00.491Z","updatedAt":"2023-08-08T21:05:26.134Z","__v":4},"description":"let magic unfold one bite at a time.","image":"https://images.pexels.com/photos/3642718/pexels-photo-3642718.jpeg?auto=compress&cs=tinysrgb&w=1080&dpr=1","ratings":[],"comments":[],"createdAt":"2023-08-09T22:07:34.398Z","updatedAt":"2023-08-10T13:56:16.185Z","__v":2}]))
})

app.get("/recipe",view.makeranklist);
//     res.send(JSON.stringify([{
//       "_id":"6528fccf3514c2909eb5aa19",
//   "title": "Blueberry Glazed Donuts",
//   "author": {
//     "_id": "64d0d46808af9a29268476ae",
//     "name": "Sarah Johnson"
//   },
//   "description": "Savor the burst of blueberry flavor in these delectable glazed donuts.",
//   "image": "https://images.pexels.com/photos/296583/pexels-photo-296583.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//   "cookingTime": "50",
//   "calories": "420.3",
//   "ingredients": ["2 cups all-purpose flour", "1/2 cup granulated sugar", "2 teaspoons baking powder", "1/2 teaspoon salt", "1 cup milk", "1/4 cup unsalted butter, melted", "1 large egg", "1 teaspoon vanilla extract", "1 cup fresh blueberries", "Vegetable oil, for frying", "Blueberry glaze"],
//   "instructions": ["In a large mixing bowl, combine the all-purpose flour, granulated sugar, baking powder, and salt.", "In another bowl, mix the milk, melted unsalted butter, egg, and vanilla extract until well combined.", "Add the fresh blueberries to the wet ingredients.", "Gradually add the wet ingredients to the dry ingredients, stirring until just combined. Do not overmix.", "Cover the bowl with plastic wrap and let the batter rest for 1 hour.", "Heat vegetable oil to 350°F and carefully drop the batter using a spoon into the oil.", "Fry the donuts until they turn golden brown.", "Dip the warm donuts in blueberry glaze.", "Enjoy the delightful blueberry glazed donuts!"],
//   "ratings": [{"user": "64d4dab779d519ec5b5fd61d", "rating": 4.8}],
//   "comments": [{"user": {"_id": "65231c24d8d38f7e92b85a73", "name": "David Brown", "profilePicture": ""}, "comment": "The blueberry glaze is heavenly!", "date": "2023-10-12T21:08:37.860Z"}],
//   "createdAt": "2023-08-09T19:58:38.845Z",
//   "updatedAt": "2023-10-12T21:19:26.013Z",
//   "__v": 9
// },
// {
//   // 6528fccf3514c2909eb5aa1a
//   "_id": "6528fccf3514c2909eb5aa1a",
//   "title": "Lemon Glazed Donuts",
//   "author": {
//     "_id": "64d0d46808af9a29268476af",
//     "name": "Jessica Miller"
//   },
//   "description": "Experience the refreshing tang of lemon in these zesty glazed donuts.",
//   "image": "https://images.pexels.com/photos/5865616/pexels-photo-5865616.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
//   "cookingTime": "50",
//   "calories": "360.5",
//   "ingredients": ["2 cups all-purpose flour", "3/4 cup granulated sugar", "2 teaspoons baking powder", "1/2 teaspoon salt", "1 cup milk", "1/4 cup unsalted butter, melted", "2 large eggs", "2 tablespoons lemon zest", "Vegetable oil, for frying", "Lemon glaze"],
//   "instructions": ["In a large mixing bowl, combine the all-purpose flour, granulated sugar, baking powder, and salt.", "In another bowl, mix the milk, melted unsalted butter, eggs, and lemon zest until well combined.", "Gradually add the wet ingredients to the dry ingredients, stirring until just combined. Do not overmix.", "Cover the bowl with plastic wrap and let the batter rest for 45 minutes.", "Heat vegetable oil to 360°F and carefully drop the batter using a piping bag into the oil.", "Fry the donuts until they turn golden brown.", "Dip the warm donuts in lemon glaze.", "Enjoy the invigorating lemon glazed donuts!"],
//   "ratings": [{"user": "64d4dab779d519ec5b5fd61e", "rating": 4.2}],
//   "comments": [{"user": {"_id": "65231c24d8d38f7e92b85a74", "name": "Sophia Rodriguez", "profilePicture": ""}, "comment": "Lemon lovers rejoice! These are amazing.", "date": "2023-10-13T21:08:37.860Z"}],
//   "createdAt": "2023-08-09T19:58:38.845Z",
//   "updatedAt": "2023-10-13T21:19:26.013Z",
//   "__v": 9
// },
// {
//   "_id":"6528fccf3514c2909eb5aa1d",
//   "title": "Chocolate Glazed Donuts",
//   "author": {
//     "_id": "64d0d46808af9a29268476ac",
//     "name": "Emily Smith"
//   },
//   "description": "Indulge in the rich taste of chocolate glazed donuts, perfect for a delightful dessert.",
//   "image": "https://images.pexels.com/photos/4057892/pexels-photo-4057892.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//   "cookingTime": "45",
//   "calories": "380.5",
//   "ingredients": ["2 cups all-purpose flour", "1/2 cup cocoa powder", "1 cup granulated sugar", "2 teaspoons baking powder", "1/2 teaspoon salt", "1 cup milk", "1/4 cup unsalted butter, melted", "1 large egg", "1 teaspoon vanilla extract", "Vegetable oil, for frying", "Chocolate glaze"],
//   "instructions": ["In a large mixing bowl, sift together the all-purpose flour, cocoa powder, sugar, baking powder, and salt.", "In a separate bowl, mix the milk, melted unsalted butter, egg, and vanilla extract until well combined.", "Combine the wet and dry ingredients, stirring until just combined. Do not overmix.", "Cover the bowl with plastic wrap and let the dough rise for 1 hour.", "Roll out the dough to about 1/2-inch thickness and cut out donut shapes.", "Fry the donuts in vegetable oil heated to 350°F until golden brown.", "Dip the donuts in warm chocolate glaze.", "Enjoy these luscious chocolate glazed donuts!"],
//   "ratings": [{"user": "64d4dab779d519ec5b5fd61b", "rating": 4.5}],
//   "comments": [{"user": {"_id": "6523011f871f42824a6a91df", "name": "Samantha Johnson", "profilePicture": ""}, "comment": "Absolutely delicious!", "date": "2023-10-10T19:20:58.918Z"}],
//   "createdAt": "2023-08-09T19:58:38.845Z",
//   "updatedAt": "2023-10-10T21:19:26.013Z",
//   "__v": 9
// }
// ]))


app.get("/recipe/:id", async (req, res) => {
    console.log("recipe called");
    const id = req.params.id;
    console.log("id:", id);
    console.log("THERE");

    var temp = {};
    
    await fetch(`http://localhost:3001/findRecepie?id=${id}`)
      .then(response => {
        console.log("HERE");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("ye yaha")
        console.log(data);
        temp = data;
      })
      .catch(error => console.error('Error:', error));
    return res.send(temp)
  })
    // return res.send(JSON.stringify(
    //     {
    //         "_id": "64d3efee1897aa8f62b65478",
    //         "title": "Strawberry Glazed Donuts",
    //         "author": {
    //           "_id": "64d0d46808af9a29268476b0",
    //           "name": "David Johnson"
    //         },
    //         "description": "Delight in the sweet and fruity flavor of strawberry glazed donuts.",
    //         "image": "https://images.pexels.com/photos/2826850/pexels-photo-2826850.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    //         "cookingTime": "55",
    //         "calories": "400.2",
    //         "ingredients": ["2 1/4 cups all-purpose flour", "1/2 cup granulated sugar", "2 teaspoons baking powder", "1/2 teaspoon salt", "1 cup milk", "1/4 cup unsalted butter, melted", "1 large egg", "1 teaspoon vanilla extract", "1 cup fresh strawberries, pureed", "Vegetable oil, for frying", "Strawberry glaze"],
    //         "instructions": ["In a large mixing bowl, combine the all-purpose flour, granulated sugar, baking powder, and salt.", "In another bowl, mix the milk, melted unsalted butter, egg, and vanilla extract until well combined.", "Add the pureed fresh strawberries to the wet ingredients.", "Gradually add the wet ingredients to the dry ingredients, stirring until just combined. Do not overmix.", "Cover the bowl with plastic wrap and let the batter rest for 1 hour.", "Heat vegetable oil to 350°F and carefully drop the batter using a spoon into the oil.", "Fry the donuts until they turn golden brown.", "Dip the warm donuts in strawberry glaze.", "Enjoy the delightful strawberry glazed donuts!"],
    //         "ratings": [{"user": "64d4dab779d519ec5b5fd61f", "rating": 4.5}],
    //         "comments": [{"user": {"_id": "65231c24d8d38f7e92b85a75", "name": "Christopher Williams", "profilePicture": ""}, "comment": "The strawberry glaze is superb!", "date": "2023-10-14T21:08:37.860Z"}],
    //         "createdAt": "2023-08-09T19:58:38.845Z",
    //         "updatedAt": "2023-10-14T21:19:26.013Z",
    //         "__v": 9
    //       }            
    // ))
const authRouter=require('./routes/view');
app.use(authRouter);

app.get('*', (req, res) => {
    res.send("Route not matching or matching too early");
})