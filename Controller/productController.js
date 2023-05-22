const Product = require("../Model/ProductModel");
const catchAsync = require("../utils/catchAync");
const AppError = require("../Error-Handling/error");
const ProductType = require("../Model/productTypeModel");

const createProduct = catchAsync(async (req, res, next) => {
  const { name, price, productType } = req.body;
  console.log(req.file);
  const productFind = await Product.find({ name: req.body.name });

  if (productFind.length > 0)
    return next(new AppError("This Product is Already Exist"));

  let producttypeID;
  const producttype = await ProductType.findOne({ name: productType });

  if (!producttype) {
    return next(new AppError("ProductType does not exists", 404));
  } else {
    producttypeID = producttype._id;
  }

  const product = await Product.create({
    name,
    price,
    productType: producttypeID,
    photo: req.file.filename,
  });

  if (product) {
    res.status(201).json({
      Status: "Product Created Successfully",
      data: product,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find().populate({
    path: "productType",
    select: "name",
  });

  if (!products) return next(new AppError("No Product to show", 404));

  res.status(200).json({
    data: products,
    message: "All Product Displayed Successfully",
  });
});

const updateProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) return next(new AppError("Id Does is not given", 400));

  const products = await Product.findById(req.params.id);
  if (!products) {
    return next(new AppError("No Product For the provided ID", 404));
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "Successfully updated",
    data: product,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return next(new AppError("No Product For the provided ID", 404));

  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Successfully Deleted",
    data: null,
  });
});

const mostRecentProducts = catchAsync(async (req, res, next) => {
  const mostRecetValue = await Product.find().sort({ timeStamps: -1 }).limit(1);
  if (mostRecetValue) {
    res.status(200).json({
      message: "This is Most recent Products",
      data: mostRecetValue,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
});

const getProductByProductType = catchAsync(async (req, res, next) => {
  const productType = await ProductType.findOne({
    name: req.params.name,
  });
  if (!productType)
    return next(new AppError("No Product For the given ProductType", 404));
  const products = await Product.find({ productType: productType.id });
  if (!products)
    return next(new AppError("No Product For the given ProductType", 404));

  res.status(200).json({
    message: "Success",
    data: products,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProduct,
  mostRecentProducts,
  getProductByProductType,
};
