const User = require("../service/schemas/user");

const userFieldsUpdate = [
  "email",
  "name",
  "location",
  "phone",
  "avatar",
  "birthdate",
];

// const validateEmail = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     await User.validate({ email });
//   } catch (error) {
//     if (error.errors.email) {
//       res.status(400).json({ message: "missing required field email" });
//     }
//   }
//   next();
// };
const validateUser = async (req, res, next) => {
  const { email, password, name, city, phone } = req.body;

  try {
    await User.validate({
      email,
      password,
      name,
      city,
      phone,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }

  next();
};

const validateUpdateField = async (req, res, next) => {
  const { field } = req.query;

  if (!userFieldsUpdate.includes(field)) {
    return res.status(400).json({ message: `Missing field ${field}` });
  }

  // перевірка типу значення поля

  next();
};

module.exports = { validateUser, validateUpdateField };
