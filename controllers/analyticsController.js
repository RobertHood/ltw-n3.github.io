const postsModel = require("../models/postsModel");

const getNewsStats = async (req, res) => {
    try {
      const newsUploaded = await postsModel.countDocuments();
      const newsEdited = await postsModel.countDocuments();
      const newsDeleted = await postsModel.countDocuments();
  
      res.json({
        newsUploaded,
        newsEdited,
        newsDeleted,
      });
    } catch (err) {
      res.status(500).json({ error: 'Error fetching news stats' });
    }
  };
  
  module.exports = { getNewsStats };