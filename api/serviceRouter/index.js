const controller = require("../../controller/service");

const express = require("express");
const router = express.Router();

router.get("/friends", controller.getFriends);

router.get("/news", controller.getNews);

module.exports = router;
