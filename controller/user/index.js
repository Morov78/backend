const path = require("path");
const fs = require("fs/promises");
const {
  addPet,
  listPets,
  updatePetAvatar,
  removePet,
} = require("../../service/pet");

const avatarDir = path.join(process.cwd(), "public", "pets");

const current = async (req, res, next) => {
  const { email, name, location, phone, avatar, birthday } = req.user;

  try {
    res.status(200).json({ email, name, location, phone, avatar, birthday });
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const result = await listPets(_id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, birthdate, breed, comments } = req.body;
  const owner = req.user._id;

  try {
    let result = await addPet(name, birthdate, breed, comments, owner);

    if (req.file) {
      const { filename, path: tempUpload } = req.file;

      const [extention] = filename.split(".").reverse();

      const avatarName = `${result._id}.${extention}`;
      const avatarUpload = path.join(avatarDir, avatarName);

      fs.rename(tempUpload, avatarUpload);

      const avatar = path.join("pets", avatarName);

      result = await updatePetAvatar(result._id, avatar);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { avatar } = await removePet(req.params.id);

  const fileName = path.basename(avatar);
  const removePath = path.join(avatarDir, fileName);

  fs.rm(removePath);

  try {
    res.status(200).json({ message: "pet deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { current, get, create, remove };
