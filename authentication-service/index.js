// npx nodemon index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 4000;


const corsOptions = {
    origin: 'http://localhost:3000', // Set the exact origin you want to allow
    credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
  };
  
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '/assets')));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, '/views'));
app.get('', (req, res) => {
    res.send("On Home Page somehow? ");
})
app.listen(port, ()=> {
    console.log(`Listening on port 4000`);
})

app.use(bodyParser.json());

const authRouter=require('./routes/auth');

app.use(authRouter);

app.get('*', (req, res) => {
    res.send("Route not matching or matching too early");
})