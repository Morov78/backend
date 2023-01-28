// const updateAvatar = require("../../middlewares/updateAvatar");
const createToken = require("../../service/token/createToken");
const serviceUser = require("../../service/user");

const path = require("path");
const fs = require("fs/promises");

const avatarDir = path.join(process.cwd(), "public", "avatars");

const registration = async (req, res, next) => {
  try {
    const { email, password, name, location, phone } = req.body;

    const user = await serviceUser.getUser(email);

    if (user) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const newUser = await serviceUser.addUser(
      email,
      name,
      location,
      phone,
      password
    );

    res.status(201).json({
      user: {
        email,
        name: newUser.name,
        location: newUser.location,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await serviceUser.getUser(email);

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }

    const { _id } = user;

    const token = createToken(_id);

    await serviceUser.updateToken(_id, token);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await serviceUser.updateToken(req.user.id, null);

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { field } = req.query;
    let { value } = req.body;
    const { _id } = req.user;

    if (field === "avatar") {
      const { filename, path: tempUpload } = req.file;

      const [extention] = filename.split(".").reverse();

      const avatarName = `${_id}.${extention}`;
      const avatarUpload = path.join(avatarDir, avatarName);

      fs.rename(tempUpload, avatarUpload);

      value = path.join("avatars", avatarName);
    }

    const result = await serviceUser.updateUser(_id, field, value);

    if (result) {
      return res.status(200).json({ field: value });
    }

    // res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registration,
  login,
  logout,
  update,
};
