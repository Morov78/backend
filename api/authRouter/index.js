const express = require("express");
const router = express.Router();

const controller = require("../../controller/auth");
const {
  validateUser,
  validateUpdateField,
} = require("../../middlewares/validator");

const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/register", validateUser, controller.registration); // validateUser

router.post("/login", controller.login); // validateUser//

router.post("/logout", auth, controller.logout); // auth

router.patch(
  "/update/:fieldName",
  auth,
  upload.single("avatar"),
  validateUpdateField,
  controller.update
);

// router.patch("/",
//   controller.updateStatusSubscription // auth, ValidateSubscription
// );

module.exports = router;
