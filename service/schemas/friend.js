const { Schema, model } = require("mongoose");

const friend = new Schema(
  {
    name: String,
    logo: String,
    worktime: Array,
    adress: String,
    email: String,
    phone: String,
  },

  { versionKey: false }
);

const Friend = model("friend", friend);

module.exports = Friend;
