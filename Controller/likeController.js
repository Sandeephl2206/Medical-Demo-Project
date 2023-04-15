const catchAsync = require("../utils/catchAync");
const Product = require("../Modal/ProductModel");
const AppError = require("../Error-Handling/error");
const Like = require("../Modal/likeModel");

const createaLike = catchAsync(async (req, res, next) => {
  console.log(req.user.name);
  const product = await Product.find({ name: req.body.name });
  console.log("Productname:", product);
  let productID = product[0]._id;
  let userID = req.user._id;
  let like = await Like.create({
    productID,
    userID,
  });
  console.log(like);
  req.liked = like;
  next();
  //  console.log(likedProduct)
});

let LikedProduct = false;
async function giveLike(req, res, next) {
  const product = await Product.find({ name: req.body.name });
  console.log(product[0]._id);
  console.log(req.liked.id);
  if (req.liked.productID == product[0]._id) {
    return next(new AppError("You Had Already Liked the Product"));
  }
  const like = await Like.findOne({ productID: product._id });
  console.log("like", like);
  LikedProduct = true;
  console.log("Product", product);
  product[0].likes++;
  //   product.save();
  //   if (like) return next(new AppError("You have already liked the Product"));
  //   if (req.body.like) {
  //     like.like = true;
  //   }
  //   if (req.body.likes == "true") like.like = true;
  res.json({
    data: product,
  });
}

const disLikeProduct = async (req, res, next) => {
  const user = req.user;
  const product = await Product.find({ name: req.body.name });
  // const liked = Like.find({ ProductID : })
};

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
  //   const bike = likedbike[0];
  //   const mostlikedbike = await Bike.findById(bike._id);
};

// const disLikeProducts = catchAsync(async (req,res) =>{
//     const product = await Product.find({name:req.body.name});
//     if(req.body.dislikes == 'yes'){
//         product[0].dislikes++;
//         product[0].save();
//     }
//     res.json({
//         data:product
//      })
// })

module.exports = {
  giveLike,
  mostLikedProducts,
  createaLike,
  disLikeProduct,
};
