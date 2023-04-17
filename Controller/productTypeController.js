const ProductType = require("../Model/productTypeModel");
const catchAsync = require("../utils/catchAync");
const AppError = require("../Error-Handling/error");
const Product = require("../Model/ProductModel");
const createProductType = catchAsync(async (req, res) => {
  const productType = await ProductType.create({
    name: req.body.name,
  });

  if (!productType) {
    res.status(201).json({
      message: "Product Type created Successfully",
      data: productType,
    });
  } else {
    return next(new AppError("Something went wrong"));
  }
});

const getAllProductType = catchAsync(async (req, res) => {
  const productType = await ProductType.find();

  if (!productType) return next(new AppError("No Product found"));
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

module.exports = {
  deleteProductType,
  createProductType,
  getAllProductType,
};
