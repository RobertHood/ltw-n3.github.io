const getNewsStats = async (req, res) => {
    try {
      const newsUploaded = await NewsModel.countDocuments({ status: 'uploaded' });
      const newsEdited = await NewsModel.countDocuments({ status: 'edited' });
      const newsDeleted = await NewsModel.countDocuments({ status: 'deleted' });
  
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