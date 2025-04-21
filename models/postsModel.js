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
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
        minlength: [20, "Description must be at least 20 characters"],
    },
    image: {
        type: String, // Lưu URL ảnh, ví dụ: http://localhost:3000/uploads/post-1234.jpg
        required: false, // Không bắt buộc
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
