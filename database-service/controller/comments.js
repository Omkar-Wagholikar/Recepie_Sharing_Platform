const Comment=require('../models/comments');

exports.getaddComment=async (req,res,next)=>{
    const currdate = new Date();
    var temp = new Comment(req.params.uname,10,5,"lai bhari",currdate);
    console.log("Response: ", await temp.addComment());
    res.send("addComment"); 
}

exports.postaddComment=async(req,res,next)=>{
    const {username,upvote,downvote,comment,createdAt} = req.body;
    const parsedDate = new Date(createdAt);
    const temp = new Comment(username,upvote,downvote,comment,parsedDate);
    console.log("Response: ",await temp.addComment());
    res.send("addComment");
}
exports.updateComment=async (req,res,next)=>{

}