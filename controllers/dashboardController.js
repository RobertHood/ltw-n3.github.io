const Post = require('../models/postsModel');
const User = require('../models/usersModel');
const Media = require('../models/mediaModels');

exports.getStats = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalMedia = await Media.countDocuments();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentPosts = await Post.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      totalPosts,
      totalUsers,
      totalMedia,
      recentPostsLast7Days: recentPosts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
