const ProductType = require("../Modal/productTypeModel");
const catchAsync = require("../utils/catchAync");
const AppError = require("../Error-Handling/error");
const Product = require("../Modal/ProductModel");
const createProductType = catchAsync(async (req, res) => {
  const productType = await ProductType.create({
    name: req.body.name,
  });

  res.status(201).json({
    message: "Product Type created Successfully",
    data: productType,
  });
});

const getAllProductType = catchAsync(async (req, res) => {
  const productType = await ProductType.find();
  // console.log(productType);
  res.status(201).json({
    message: "All Product Types Displayed Successfully",
    data: productType,
  });
});

const deleteProductType = catchAsync(async (req, res, next) => {
  console.log(req.params.name);
  const productType = await ProductType.findOne({
    name: req.params.name,
  });
  if (!productType) return next(new AppError("Product Type Does not exist"));
  console.log(productType._id);
  const products = await Product.find({ productType: productType._id });
  console.log(products);
  if (products.length > 0) {
    return next(
      new AppError("Product Type can't be deleted because it is in use")
    );
  } 
  const product = await ProductType.findByIdAndDelete(productType._id);
  res.status(201).json({
    message: "Product Type is deleted successfully",
  });
});

// const getProductbyProductType = catchAsync(async(req,res)=>{
//     console.log(req.params)
//     const product = await Product.find({Product_type:req.params.Product_type})
//     console.log(product)
//     res.json({
//        data:product
//     })
// })

// const getMostRecentProduct = catchAsync(async(req,res) =>{
//     const latestProduct = await Product.aggregate([
//        {$group:{
//        Latest_product: {$max: '$timeStamp'}
//     }}])
// })

// const mostRecentProducts = catchAsync(async (req,res) =>{
//     const maxValue = await Product.find().sort({'timeStamp':-1}).limit(1)
//     console.log(maxValue)
//     res.json({
//         data:maxValue
//      })
// })

// const commentProduct = catchAsync(async (req,res,next)=>{
//     const product = await Product.find({name:req.body.name})
//     product.comment = req.body.comment;
//     res.json({
//         data:product
//      })
// })

// const updatedata = catchAsync(async(req,res) =>{
//     console.log(req.file)
//     const product = await Product.findById(req.params.id);
//     if(!product){
//       return next(new AppError("provide new ",401))
//     }
//     if(req.file){
//         console.log(product.photo)
//       product.photo = req.file.filename;
//       product.save()
//     }
//     res.json({
//         data:product
//     })
// })

module.exports = {
  deleteProductType,
  createProductType,
  getAllProductType,
};
