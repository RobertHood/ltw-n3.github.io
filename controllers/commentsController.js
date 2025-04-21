const commentsModels = require('../models/commentsModels');
const Comment = require('../models/commentsModels');

exports.loadComments = async(req, res) =>{
  const { cmt } = req.query;
  const cmtsPerPost = 5;

  try{
    let cmtNum = 0;
    if(cmt <= 1){
      cmtNum = 0;
    }else{
      cmtNum = cmt - 1;
    }
    const result = await Comment.find()
      .sort({createdAt: -1})
      .skip(cmtNum * cmtsPerPost)
      .limit(cmtsPerPost)
      .populate({
        path: 'postID',
        select: 'title',
      });
      res.status(200).json({success:true, message: "Comments loaded"})
  } catch(error){
    console.log(error)
  } 
}
//postID để test: 5f7a9b3c8d1e2f4a6b7890cd
exports.publishComment = async (req, res) =>{
  const{ anonName, content, date, postID } = req.body;  
  // const {postID} = req.post;
  try {
    const newComment = await Comment.create({
      anonName, content, date, postID
    });
    res.status(201).json({success: true, message: "Comment published", data: newComment})
  } catch (error) {
    console.log(error);
  }
} 
