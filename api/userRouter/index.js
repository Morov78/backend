const express = require("express");
const router = express.Router();

const controller = require("../../controller/user");

const User = require("../../service/schemas/user");
const auth = require("../../middlewares/auth");

const upload = require("../../middlewares/upload");

// const {
//   validateUser,
//   ValidateSubscription,
//   validateEmail,
// } = require("../../middlewares/validator");

// цей роутер не треба для проекту

router.get("/", async (req, res) => {
  const users = await User.find();
  res.status(200).send({ users });
});

// *************************8

router.get("/current", auth, controller.get);

router.post("/pets", auth, upload.single("avatar"), controller.create);

router.delete("/pets/:id", auth, controller.remove);

// router.patch("/",
//   controller.updateStatusSubscription // auth, ValidateSubscription
// );

module.exports = router;
