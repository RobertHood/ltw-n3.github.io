// controllers/mediaController.js
const Media = require('../models/mediaModels');
const path = require('path');
const fs = require('fs');

exports.uploadImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  const media = new Media({
    filename: req.file.filename,
    originalname: req.file.originalname,
    url: imageUrl,
    mimetype: req.file.mimetype,
    size: req.file.size
  });

  await media.save();
  res.json({ imageUrl, media });
};

exports.getAllMedia = async (req, res) => {
  const list = await Media.find().sort({ uploadedAt: -1 });
  res.json(list);
};

exports.deleteMedia = async (req, res) => {
  const media = await Media.findById(req.params.id);
  if (!media) return res.status(404).json({ message: 'Not found' });

  const filePath = path.join(__dirname, '../uploads', media.filename);
  fs.unlink(filePath, () => {});
  await media.deleteOne();

  res.json({ message: 'Deleted' });
};
