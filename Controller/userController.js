const User = require("../Model/UserModel");
const sendEmail = require("../utils/email");
const jwt = require("jsonwebtoken");
const catchAync = require("../utils/catchAync");
const AppError = require("../Error-Handling/error");
const bcrypt = require("bcrypt");
require("dotenv").config();

const registerUser = catchAync(async (req, res, next) => {
  const { email, password, confirmPassword, name } = req.body;
  if (!email || !password || !confirmPassword || !name) {
    return next(new AppError("Provide All the Requied Details", 401));
  }

  if (name.split(" ").length > 3) {
    return next(new AppError("Please Avoid Spaces", 401));
  }
  if (password.includes(" ") || email.includes(" "))
    return next(new AppError("Please Avoid Spaces", 401));

  const userFind = await User.findOne({ email });
  if (userFind) return next(new AppError("This Email is Already registered"));

  const user = await User.create(req.body);
  if (user) {
    res.json({
      message: "Successfully register",
      data: { name: user.name, email: user.email },
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const getAllUser = async (req, res) => {
  const users = await User.find();
  if (!users) return next(new AppError("No User to Display", 404));
  if (users) {
    res.json({
      message: "Successfully register",
      data: users,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const loginUser = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return next(new AppError("Provide email and password both", 401));
  }

  const UserInfo = await User.findOne({ email });
  if (!UserInfo) return next(new AppError("Please Register First", 401));

  const PasswordChecking = await bcrypt.compare(password, UserInfo.password);
  if (!PasswordChecking)
    return next(new AppError("Please provide Correct Password", 401));

  const token = jwt.sign({ id: UserInfo._id }, process.env.SECRET_KEY);
  if (UserInfo) {
    res.json({
      message: "Successfully login",
      data: { name: UserInfo.name, email: UserInfo.email },
      token,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

module.exports = {
  registerUser,
  getAllUser,
  loginUser,
};
