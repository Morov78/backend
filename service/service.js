const Friend = require("./schemas/friend");
const News = require("./schemas/news");

const listFriends = async () => {
  return await Friend.find();
};

const listNews = async () => {
  return await News.find();
};

module.exports = { listFriends, listNews };
