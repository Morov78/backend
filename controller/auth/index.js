// const updateAvatar = require("../../middlewares/updateAvatar");
const createToken = require("../../service/token/createToken");
const serviceUser = require("../../service/user");

const getFileUrl = require("../../service/file/getFileUrl");

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
    const { fieldName } = req.params;
    let value = req.body[fieldName];
    const { _id } = req.user;

    if (fieldName === "avatar") {
      value = getFileUrl(req.file, "users", _id);
    }

    const body = { [fieldName]: value };

    const result = await serviceUser.updateUser(_id, body);

    if (result) {
      return res.status(200).json(body);
    }
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
