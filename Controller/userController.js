const User = require("../Modal/UserModel");
const sendEmail = require("../utils/email");
const jwt = require("jsonwebtoken");
const catchAync = require("../utils/catchAync");
require("dotenv").config();

const registerUser = catchAync(async (req, res) => {
  const user = await User.create(req.body);
  console.log(user);

  await sendEmail({
    email: user.email,
    subject: "Registered",
    message: `Your Email ID is ${user.email} and your Login Password is ${user.password}`,
  });
  res.json({
    result: "Success",
    data: user,
  });
});

const getAllUser = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json({
    data: users,
  });
};

const loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    throw new Error("Provide email and passowrd both");
  }
  const UserInfo = await User.findOne({ email });
  if (UserInfo.password != req.body.password) {
    throw new Error("Wrong Password");
  }
  let UserID = UserInfo._id;
  console.log(UserInfo);
  const token = jwt.sign({ id: UserInfo._id }, process.env.SECRET_KEY);
  res.json({
    result: "Success",
    data: UserInfo,
    token,
  });
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
