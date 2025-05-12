const express = require('express');
const path = require('path');
const postsController = require('../controllers/postsController');
const { identifier } = require('../middlewares/identification');
const router = express.Router();
const multer = require('multer');
// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, 'post-' + uniqueName + path.extname(file.originalname));
    }
  });
const upload = multer({ storage });

router.get('/all-posts', postsController.getPosts);
router.get('/single-post', postsController.singlePost);

router.get('/posts-by-user',postsController.getPostsByUser);
router.get('/posts-by-category', postsController.getPostsByCategory);
router.get('/posts-by-title', postsController.getPostsByTitle);
router.get('/posts-by-subcategory', postsController.getPostsBySubCategory);

router.put('/update-post', identifier,upload.single('image'), postsController.updatePost);
router.delete('/delete-post', identifier, postsController.deletePost);

router.post('/create-post',identifier, upload.single('image'), postsController.createPosts);

module.exports = router;