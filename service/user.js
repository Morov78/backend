const User = require("./schemas/user");

const getUser = async (email) => {
  return await User.findOne({ email });
};

const addUser = async (email, name, location, phone, password) => {
  const newUser = new User({ email, name, location, phone });

  newUser.setPassword(password);

  return await newUser.save();
};

const updateToken = async (id, token = null) => {
  return await User.findByIdAndUpdate(
    id,
    { token },
    { returnDocument: "after" }
  );
};

const updateUser = async (_id, body) => {
  return User.findOneAndUpdate(_id, body, {
    returnDocument: "after",
  });
};

module.exports = {
  getUser,
  addUser,
  updateToken,
  updateUser,
};
