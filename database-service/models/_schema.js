// node
//  .load schema.js
// Dog.find().then(data => console.log(data))
// Dog.updateOne({name:"Rocky", age:4}, {breed:"Indi"}).then(data => console.log(data))

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dogs', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
})

const dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    breed: String,
    friendly:Boolean
});

const Dog = mongoose.model('Dog', dogSchema); // Model Class is Dog, Its instances are saved into the database.
// Insertion types: 
// Single Insert- 
// const rocky = new Dog({name: 'Rocky24', age: 4, breed: 'Lab', friendly: true});
// rocky.save().then(data => {console.log("IT WORKED"); console.log(data)}).catch(e => {console.log(e)});

// // Multiple Insert-
// Dog.insertMany([
//     Dog({name: 'R1', age: 3, breed: 'V1', friendly: true}),
//     Dog({name: 'R2', age: 3, breed: 'V2', friendly: true}),
//     Dog({name: 'R3', age: 3, breed: 'V3', friendly: true}),
// ]).then(res => {console.log("IT WORKED"); console.log(res)}).catch(e => {console.log(e)});