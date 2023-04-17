const catchAsync = require("../utils/catchAync");
const Product = require("../Model/ProductModel");
const AppError = require("../Error-Handling/error");
const Comment = require("../Model/commentModel");

const comment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new AppError("Product does not exists", 403));
  }
  product.comment = req.body.comment;
  await product.save();
  console.log(product);
  const addComment = await Comment.create({
    userID: req.user.id,
    productID: product.id,
    comment: req.body.comment,
  });

  const showComment = await Comment.findOne({
    userID: req.user.id,
    productID: product.id,
    comment: req.body.comment,
  })
    .populate({ path: "productID", select: "name" })
    .populate({ path: "userID", select: "name" });

  if (showComment) {
    res.json({
      message: "Comment Added Successfully",
      data: showComment,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

module.exports = { comment };
