const mongodb = require('mongodb');
const { system } = require('nodemon/lib/config');
const mongoose = require('mongoose');


const mongoConnect = (path) =>{
    mongoose.connect(`mongodb://localhost:27017/RecepieProject`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })
}
exports.mongoConnect = mongoConnect;
