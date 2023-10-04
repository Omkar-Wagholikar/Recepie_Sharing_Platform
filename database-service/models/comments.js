const mongoose = require('mongoose');
const { mongoConnect } = require('../database/database.js');

// mongoConnect('comments');

const commentsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    upvote: {
        type: Number,
        required: true
    },
    downvote: {
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    createdAt:{
        type : Date,
        required:true
    }
})

const CommentModel = mongoose.model('comment', commentsSchema);

class Comment{
    constructor(username, upvote, downvote, comment, createdAt){
        this.username = username;
        this.upvote = upvote;
        this.downvote = downvote;
        this.comment = comment;
        this.createdAt = createdAt;
    }
    

    async addComment(){

        const tempComment = new CommentModel({
            username: this.username,
            upvote : this.upvote,
            downvote : this.downvote ,
            comment : this.comment,
            createdAt : this.createdAt
        })

        return await tempComment.save().then(data => {
            console.log("comment saved");
            console.log(data);
            return true;
        }).catch(e => {
            console.log(e);
            return false;
        });
    }

    static async updateComment(filter, newData){
        return await CommentModel.findOneAndUpdate(filter, newData).then(data => {
            console.log("Success");
            console.log(data);
            return true;
        }).catch(e => {
            console.log("error");
            console.log(e);
            return false;
        });
    }
    async deleteRecepie(objId){
        return await IngredientModel.deleteOne(objId).then(data => {
            console.log("Success");
            console.log(data);
            return true;
        }).catch(e => {
            console.log("error");
            console.log(e);
            return false;
        });
    }
}

module.exports = {
    CommentModel,
    Comment
};