const { required } = require('joi');
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    anonName:{
        type: String,
        required: [true],
        trim: true,
    }, 
    content: {
        type: String,
        require: [true, "Content is required"],
    },
    date:{
        type: Date,
        default: Date.now
    },
    postID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, "PostID is required"]
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "UserID is required"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Comment", commentSchema); 