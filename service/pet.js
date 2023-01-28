const Pet = require("./schemas/pet");

const addPet = async (user) => {
  return Pet.create(user);
};

const listPets = async (_id) => {
  return Pet.find({ owner: _id }, { owner: 0 });
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
