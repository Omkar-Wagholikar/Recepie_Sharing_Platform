// npx nodemon index.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = 4000;

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


app.get('*', (req, res) => {
    res.send("Route not matching or matching too early");
})