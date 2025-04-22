const axios = require('axios');

const API_KEY = process.env.PANDASCORE_API_KEY;
const BASE_URL = 'https://api.pandascore.co';

const getValorantMatches = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/valorant/matches/upcoming`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu Valorant' });
  }
};

const getLoLMatches = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/lol/matches/upcoming`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu LoL' });
  }
};

module.exports = { getValorantMatches, getLoLMatches };

