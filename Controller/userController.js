const User = require("../Model/UserModel");
const sendEmail = require("../utils/email");
const jwt = require("jsonwebtoken");
const catchAync = require("../utils/catchAync");
const AppError = require("../Error-Handling/error");
require("dotenv").config();

const registerUser = catchAync(async (req, res) => {
  const user = await User.create(req.body);

  await sendEmail({
    email: user.email,
    subject: "Registered",
    message: `Your Email ID is ${user.email} and your Login Password is ${user.password}`,
  });
  if (user) {
    res.json({
      message: "Successfully register",
      data: user,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const getAllUser = async (req, res) => {
  const users = await User.find();
  if (!users) return next(new AppError("No User to Display", 500));
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
    return next(new AppError("Provide email and passowrd both", 500));
  }

  const UserInfo = await User.findOne({ email });
  if (!UserInfo) return next(new AppError("Please Regiter First", 500));

  if (UserInfo.password != req.body.password) {
    return next(new AppError("Wrong Password", 500));
  }

  const token = jwt.sign({ id: UserInfo._id }, process.env.SECRET_KEY);
  if (UserInfo) {
    res.json({
      message: "Successfully login",
      data: UserInfo,
      token,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const protectingRoutes = async (req, res, next) => {
  const token = req.headers.authorization.split(" ");
  const jwtToken = token[1].toString();
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    if (!token) {
      return next(new AppError("you are Logged Out", 401));
    }
  }
  console.log("Token", jwtToken);
  const verification = jwt.verify(jwtToken, process.env.SECRET_KEY);
  console.log(verification);
  const freshuser = await User.findById(verification.id);
  console.log("Product is protected");
  console.log(freshuser);
  req.user = freshuser;
  next();
};
module.exports = {
  registerUser,
  getAllUser,
  loginUser,
  protectingRoutes,
};
