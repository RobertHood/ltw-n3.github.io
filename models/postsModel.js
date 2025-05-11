const { required } = require('joi');
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [10, "Title must be at least 10 characters"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
        enum: {
            values: ["VALORANT", "League of Legends", "Teamfight Tactics"],
            message: "{VALUE} is not a valid category",
        },
    },
    subcategory: {
        type: String,
        required: [true, "Subcategory is required"],
        trim: true,
        enum: {
            values: ["Tournament News", "Game Updates"],
            message: "{VALUE} is not a valid subcategory, it can only be 'Tournament News' or 'Game Updates'"
        }
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [20, "Description must be at least 20 characters"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true,
    },
    image: {
        type: String, 
        required: false, 
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Author ID is required"],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);
