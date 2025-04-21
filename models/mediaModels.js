// models/mediaModel.js
const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  url: String,
  mimetype: String,
  size: Number,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Media', mediaSchema);
