const { Schema, model, SchemaTypes } = require("mongoose");

const notice = new Schema(
  {
    type: {
      type: String,
      enum: ["sell", "lostfound", "ingoodhands"],
      required: [true, "Notice type is required"],
    },
    title: {
      type: String,
      minLength: 2,
      maxLength: 48,
      required: [true, "Set title for notice"],
    },
    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      default: null,
    },
    birthdate: {
      type: Date,
      default: null,
    },
    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
      default: null,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "The sex is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    price: {
      type: Number,
      default: null,
      // min: [1, "Price must be greater than 0"],
      // required: [true, "price is required"],
    },
    avatar: {
      type: String,
      default: null,
    },
    comments: {
      type: String,
      minLength: 2,
      maxLength: 120,
      required: [true, "Comments is required"],
    },
    favorite: {
      type: Array(SchemaTypes.ObjectId),
      ref: "user",
      default: [],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false }
);

const Notice = model("notice", notice);

module.exports = Notice;
