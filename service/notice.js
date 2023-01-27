const Notice = require("./schemas/notice");

const addNotice = async (type, price, args) => {
  let filter = { type, ...args };

  if (type === "sell") {
    filter = { ...filter, price };
  }

  return Notice.create({ ...filter });
};

const updateNoticeAvatar = async (_id, avatar) => {
  return Notice.findByIdAndUpdate(
    _id,
    { avatar: avatar },
    { returnDocument: "after" }
  );
};

const listNoticesByType = async (type) => {
  return Notice.find({ type });
};

const getById = async (_id) => {
  return Notice.findOne({ _id });
};

const removeNotice = async (id, userId) => {
  return Notice.findOneAndDelete({ _id: id, owner: userId });
};

const addToFavoriteList = async (noticeId, userId) => {
  return Notice.findOneAndUpdate(
    { _id: noticeId },
    { $push: { favorite: userId } },
    { returnDocument: "after" }
  );
};

const removeWithFavoriteList = async (noticeId, userId) => {
  return Notice.findOneAndUpdate(
    { _id: noticeId },
    { $pull: { favorite: userId } },
    { returnDocument: "after" }
  );
};

const listFavoriteNotice = async (userId) => {
  return Notice.find({ favorite: [userId] }, { favorite: 0, owner: 0 });
};

const listNotices = async (userId) => {
  return Notice.find({ owner: userId }, { favorite: 0, owner: 0 });
};

module.exports = {
  addNotice,
  updateNoticeAvatar,
  listNoticesByType,
  addToFavoriteList,
  removeWithFavoriteList,
  listFavoriteNotice,
  listNotices,
  removeNotice,

  getById,
};
