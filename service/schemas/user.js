const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");

const user = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [7, "Password must contain at least 7 characters"],
      // maxLength: [32, "Password must contain no more than 32 characters"],
    },
    name: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    birthdate: {
      type: Date,
      default: null,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

// user.pre("save", async function () {
//   console.log(this.isNew);
// });

user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = model("user", user);

module.exports = User;
