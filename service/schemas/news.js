const { Schema, model } = require("mongoose");

const news = new Schema(
  {
    title: String,
    text: String,
    date: String,
    url: String,
  },

  { versionKey: false }
);

const News = model("news", news);

module.exports = News;
