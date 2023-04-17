const catchAsync = require("../utils/catchAync");
const Product = require("../Model/ProductModel");
const AppError = require("../Error-Handling/error");
const Like = require("../Model/likeModel");
const Dislike = require("../Model/dislikeModel");

// adds like on product by id

const LikedProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) return next(new AppError("Product does not exists", 403));
  console.log(product.id, req.user.id);

  const existingLike = await Like.findOne({
    userID: req.user.id,
    productID: product.id,
  });
  console.log("ëxistingLike", existingLike);

  if (existingLike) {
    return next(new AppError("You have already liked the product", 500));
  }

  const addLike = await Like.create({
    userID: req.user.id,
    productID: product.id,
  });

  const showLike = await Like.find({
    userID: req.user.id,
    productID: product.id,
  })
    .populate("productID")
    .populate("userID");

  console.log(addLike);
  if (addLike) {
    // deleting dislike
    await Dislike.findOneAndDelete({
      userID: req.user.id,
      productID: product.id,
    });

    res.json({
      message: "U have successfully like the product",
      data: showLike,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const disLikedProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) return next(new AppError("Product does not exists", 403));
  console.log(product.id, req.user.id);

  const existingDisLike = await Dislike.findOne({
    userID: req.user.id,
    productID: product.id,
  });
  console.log("existingDisLike", existingDisLike);

  if (existingDisLike) {
    return next(new AppError("You have already Disliked the product", 500));
  }

  const addDisLike = await Dislike.create({
    userID: req.user.id,
    productID: product.id,
  });

  const showDisLike = await Dislike.find({
    userID: req.user.id,
    productID: product.id,
  })
    .populate("productID")
    .populate("userID");

  console.log(showDisLike);
  if (addDisLike) {
    // deleting dislike
    await Like.findOneAndDelete({
      userID: req.user.id,
      productID: product.id,
    });

    res.json({
      message: "U have successfully Dislike the product",
      data: showDisLike,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const mostLikedProducts = async (req, res, next) => {
  const maxValue = await Like.aggregate([
    {
      $group: {
        _id: "$productID",
        count: { $sum: 1 }, // counting no. of documents pass
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 1,
    },
  ]).exec();

  const id = maxValue[0];
  const MostLiked = await Product.findById(id);
  res.json({
    message: "Most Recent Product",
    data: MostLiked,
  });
};

module.exports = {
  LikedProduct,
  mostLikedProducts,
  disLikedProduct,
};
