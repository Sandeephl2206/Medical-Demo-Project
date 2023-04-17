const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAync");
const User = require("../Model/UserModel");
const protectingRoutes = catchAsync(async (req, res, next) => {
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
  console.log("verified", verification);
  const freshuser = await User.findById(verification.id);
  console.log("Product is protected");
  console.log(freshuser);
  req.user = freshuser;
  next();
});
module.exports = {
  protectingRoutes,
};
