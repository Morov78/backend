const express = require("express");
const router = express.Router();

const controller = require("../../controller/notice");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.get("/favorites", auth, controller.getUserFavorites);

router.get("/current", auth, controller.getCurrent);

router.get("/", controller.get);

router.get("/:id", controller.getById);

router.delete("/:id", auth, controller.remove);

router.patch("/:id/addfavorite", auth, controller.addUserToFavorite);

router.patch("/:id/removefavorite", auth, controller.removeUserWithFavorite);

router.post("/", auth, upload.single("avatar"), controller.create);

// router.delete("/:id", auth, controller.remove);

// router.put("/:id", auth, controller.update);

// router.patch("/:id/favorite", auth, controller.updateStatusContact);

module.exports = router;
