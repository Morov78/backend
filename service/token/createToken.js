const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const createToken = (_id) => {
  const payload = { _id };

  return jwt.sign(payload, secret, { expiresIn: "23h" });
};

module.exports = createToken;
