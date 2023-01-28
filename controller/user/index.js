const getFileUrl = require("../../service/file/getFileUrl");
const removeFile = require("../../service/file/removeFile");

const { addPet, listPets, removePet } = require("../../service/pet");
const Pet = require("../../service/schemas/pet");

// const avatarDir = path.join(process.cwd(), "public", "pets");

const mainDir = "pets";
const sizeAvatar = [240, 240];

const get = async (req, res, next) => {
  try {
    const { _id, email, name, location, phone, avatar, birthdate } = req.user;

    const result = await listPets(_id);

    res.status(200).json({
      user: { email, name, location, phone, avatar, birthdate },
      pets: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, birthdate, breed, comments } = req.body;
  const owner = req.user._id;

  try {
    const newPet = new Pet({ name, birthdate, breed, comments, owner });

    if (req.file) {
      const avatarUrl = getFileUrl(req.file, mainDir, newPet._id, sizeAvatar);

      newPet.avatar = avatarUrl;
    }

    const result = await addPet(newPet);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await removePet(id);

    if (result) {
      if (result.avatar) {
        removeFile(result.avatar);
      }

      res.status(204).json();
    }

    res.status(404).json({ message: "Pet not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = { get, create, remove };
