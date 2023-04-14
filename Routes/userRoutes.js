const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController")

router.route("/register").post(UserController.registerUser)
router.route("/login").post(UserController.loginUser)

module.exports = router;