const catchAsync = require('../utils/catchAync');
const Product = require("../Modal/ProductModel");
const AppError = require("../Error-Handling/error");
const Comment = require("../Modal/commentModel");

const comment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return next(new AppError("Product does not exists", 403));
  }
  product.comment = req.body.comment;
  await product.save();
  console.log(product)
  const addComment = new Comment({
    // user_id: req.user.id,
    product_id: product.id,
    comment: req.body.comment,
  });
  const created = await addComment.save();

  if (created) {
    res.json({
      msg: "Comment Added Successfully",
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

module.exports = {comment};