const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,       
        trim: true,
        minlength: [3, "Username must be at least 3 characters"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
        trim: true,
        minlength: [10, "Email must be at least 10 characters"],
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    verified:{
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String,
        select: false
    },
    verificationCodeValidation:{
        type: String,
        select: false
    },
    forgotPasswordCode:{
        type: String,
        select: false
    },
    forgotPasswordCodeValidation:{
        type: String,
        select: false
    },
},{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);