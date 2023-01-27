const { Schema, model, SchemaTypes } = require("mongoose");

const pet = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      default: null,
      // required: [true, "Name is required"],
    },
    birthdate: {
      type: Date,
      default: null,
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 16,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    comments: {
      type: String,
      minLength: 2,
      maxLength: 24,
      default: null,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false }
);

const Pet = model("pet", pet);

module.exports = Pet;
