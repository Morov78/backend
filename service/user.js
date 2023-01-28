const User = require("./schemas/user");

// +
const getUser = async (email) => {
  return await User.findOne({ email });
};
// +
const addUser = async (email, name, location, phone, password) => {
  const newUser = new User({ email, name, location, phone });

  newUser.setPassword(password);

  return await newUser.save();
};
// +
const updateToken = async (id, token = null) => {
  return await User.findByIdAndUpdate(
    id,
    { token },
    { returnDocument: "after" }
  );
};

const updateUser = async (_id, field, value) => {
  return User.findOneAndUpdate(
    _id,
    { [field]: value },
    {
      returnDocument: "after",
    }
  );
};

module.exports = {
  getUser,
  addUser,
  updateToken,
  updateUser,
};
