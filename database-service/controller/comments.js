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
}