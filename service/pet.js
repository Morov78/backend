const Pet = require("./schemas/pet");

const addPet = async (name, birthdate, breed, comments, owner) => {
  return Pet.create({
    name,
    birthdate,
    breed,
    comments,
    owner,
  });
};

const listPets = async (_id) => {
  return Pet.find({ owner: _id });
};

const updatePetAvatar = async (_id, avatar) => {
  return Pet.findByIdAndUpdate(
    _id,
    { avatar: avatar },
    { returnDocument: "after" }
  );
};

const removePet = async (_id) => {
  return Pet.findByIdAndDelete(_id);
};

module.exports = {
  addPet,
  listPets,
  updatePetAvatar,
  removePet,
};
