const Product = require("../Modal/ProductModel");
const catchAsync = require("../utils/catchAync");
const AppError = require("../Error-Handling/error");
const ProductType = require("../Modal/productTypeModel");

const createProduct = catchAsync(async (req, res, next) => {
  const { name, price, productType } = req.body;
  let typeID;

  const typeP = await ProductType.findOne({ name: productType });
  if (!typeP) {
    return next(new AppError("ProductType does not exists", 404));
  } else {
    typeID = typeP._id;
  }
  console.log(typeP);

  const product = await Product.create({
    name,
    price,
    productType: typeID,
  });

  if (product) {
    res.status(201).json({
      data: product,
      message: "Product Created Successfully",
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find().populate("productType");
  if (!products) return next(new AppError("No Product to show", 404));
  res.status(201).json({
    data: products,
    message: "All Product Displayed Successfully",
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const products = await Product.findById(req.params.id).populate({
    path: "productType",
    select: "name",
  });
  if (!products)
    return next(new AppError("No Product For the provided ID", 404));

  res.status(201).json({
    data: products,
    message: "Successfully Executed",
  });
});

const updateProductById = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    console.log("PRoducts", product);
    return next(new AppError("No Product For the provided ID", 401));
  }
  res.status(201).json({
    data: product,
    message: "Successfully updated",
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(201).json({
    data: null,
    message: "Successfully Deleted",
  });
});

const mostRecentProducts = catchAsync(async (req, res) => {
  const mostRecetValue = await Product.find().sort({ timeStamp: -1 }).limit(1);
  console.log(mostRecetValue);
  res.status(201).json({
    message: "This is Most recent Products",
    data: mostRecetValue,
  });
});

const getProductByProductType = catchAsync(async (req, res, next) => {
  const productType = await ProductType.findOne({
    name: req.params.name,
  });
  if (!productType)
    return next(new AppError("No Product For the given ProductType", 000));
  const products = await Product.find({ productType: productType.id });
  if (!products)
    return next(new AppError("No Product For the given ProductType", 000));

  res.status(201).json({
    message: "This is Most recent Products",
    data: products,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProduct,
  mostRecentProducts,
  getProductByProductType,
};
