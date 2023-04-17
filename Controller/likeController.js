const catchAsync = require("../utils/catchAync");
const Product = require("../Modal/ProductModel");
const AppError = require("../Error-Handling/error");
const Like = require("../Modal/likeModel");
const Dislike = require("../Modal/dislikeModel")

// adds like on product by id
const LikedProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findById(id);
  if (!product) return next(new AppError("Product does not exists", 403));
  console.log(product.id,req.user.id);
  const existingLike = await Like.findOne({
    user_id: req.user.id,
    product_id: product.id,
  });
  console.log('ëxistingLike',existingLike)
  if (existingLike) {
    return res.status(400).json({
      msg: "You have already liked the product",
    });
  }

  const addLike = new Like({ user_id: req.user.id, product_id: product.id });
  const created = await addLike.save();
  console.log(addLike)
  if (created) {
    // deleting dislike
    await Dislike.findOneAndDelete({
      user_id: req.user.id,
      product_id: product.id,
    });
  
    res.json({
      msg: "U have successfully like the product",
    });

  } else {
    return next(new AppError("Something went wrong", 500));
  }
});


const disLikedProduct = catchAsync( async (req, res, next) => {
  const id = req.params.id;
  console.log("ïd",id)
    const product = await Product.findById(id);
    console.log(product)
    if (!product) return next(new AppError("Product does not exists", 403));
    if(product.dislikes == true){
      return next(new AppError("Already DisLiked"))
    }
    product.dislikes = true;
    product.save();
    console.log(product)
    const alreadydisLiked = await Like.findOne({
      product_id: product._id,
    });
    console.log(alreadydisLiked)
    if (alreadydisLiked) {
      return res.status(400).json({
        msg: "You have already Disliked the product",
      });
    }
    const adddisLike = await Dislike.create({ product_id: product.id });
    console.log("äddLike",adddisLike)
    if (adddisLike) {
      // deleting like
      await Like.findOneAndDelete({
        // user_id: req.user.id,
        product_id: product.id,
      });
       res.json({
        msg: "U have successfully like the product",
      });
    } else {
      return next(new AppError("Something went wrong", 500));
    }
  });
  
const mostLikedProducts = async (req, res, next) => {
  console.log("ef");
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
  console.log(MostLiked);
  res.json({
    data: MostLiked,
  });
 };
 
module.exports = {
  LikedProduct,
  mostLikedProducts,
  disLikedProduct,
};
