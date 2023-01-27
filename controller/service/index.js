const { listFriends, listNews } = require("../../service/service");

const getFriends = async (_, res) => {
  const friends = await listFriends();
  res.status(200).send(friends);
};

const getNews = async (req, res, next) => {
  const news = await listNews();
  res.status(200).send(news);
};

module.exports = { getFriends, getNews };
