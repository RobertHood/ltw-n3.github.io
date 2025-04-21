// routers/mediaRouter.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mediaController = require('../controllers/mediaController');

// Cấu hình lưu ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), mediaController.uploadImage);
router.get('/', mediaController.getAllMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
