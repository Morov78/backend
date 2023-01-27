const path = require("path");
const fs = require("fs/promises");

const service = require("../../service/notice");

const avatarDir = path.join(process.cwd(), "public", "notices");

const get = async (req, res, next) => {
  try {
    const { type } = req.query;

    const result = await service.listNoticesByType(type);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await service.getById(req.params.id);

    if (result) {
      return res.status(200).json(result);
    }

    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res) => {
  const { type } = req.query;
  const owner = req.user._id;

  const { title, name, birthdate, breed, comments, price, sex, location } =
    req.body;

  try {
    let result = await service.addNotice(type, price, {
      title,
      name,
      birthdate,
      breed,
      comments,
      sex,
      location,
      owner,
    });

    if (req.file) {
      const { filename, path: tempUpload } = req.file;

      const [extention] = filename.split(".").reverse();

      const avatarName = `${result._id}.${extention}`;
      const avatarUpload = path.join(avatarDir, avatarName);

      fs.rename(tempUpload, avatarUpload);

      const avatar = path.join("notices", avatarName);

      result = await service.updateNoticeAvatar(result._id, avatar);
    }

    res.status(201).json(result);
  } catch (error) {
    const errorsKeys = Object.keys(error.errors);

    res
      .status(400)
      .json({ message: `missing required fields: ${errorsKeys.join(", ")}` });
  }
};

const remove = async (req, res, next) => {
  try {
    const result = await service.removeNotice(req.params.id, req.user._id);

    if (result) {
      const { avatar } = result;

      if (avatar) {
        // видалення файлу
        const fileName = path.basename(avatar);
        const removePath = path.join(avatarDir, fileName);

        fs.rm(removePath);
      }

      return res.status(200).json({ message: "contact deleted" });
    }

    res.status(404).json({ message: "Not found" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const addUserToFavorite = async (req, res, next) => {
  const { id } = req.params;

  try {
    let result = await service.getById(id);

    if (result) {
      const { _id } = req.user;

      if (!result.favorite.includes(_id)) {
        result = await service.addToFavoriteList(id, _id);
      }

      console.log(result);
    }

    res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const removeUserWithFavorite = async (req, res, next) => {
  const { id } = req.params;

  try {
    let result = await service.getById(id);

    if (result) {
      const { _id } = req.user;

      if (result.favorite.includes(_id)) {
        result = await service.removeWithFavoriteList(id, _id);
      }

      console.log(result);
    }

    res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const getUserFavorites = async (req, res, next) => {
  try {
    const result = await service.listFavoriteNotice(req.user._id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getCurrent = async (req, res, next) => {
  try {
    const result = await service.listNotices(req.user._id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  getById,
  create,
  remove,

  addUserToFavorite,
  removeUserWithFavorite,
  getUserFavorites,
  getCurrent,
};
