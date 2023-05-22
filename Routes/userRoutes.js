const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController");
// const uploadUserPhoto  = require("../Middleware/fileUpload");
const upload = require("../Middleware/fileUpload");

router
  .route("/register")
  .post(upload.uploadUserPhoto, UserController.registerUser);
router.route("/login").post(UserController.loginUser);
router.route("/").get(UserController.getAllUser);
router.route("/updatePassword").post(UserController.updatePassword);

module.exports = router;
