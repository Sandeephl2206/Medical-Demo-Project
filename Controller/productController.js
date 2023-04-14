const Product = require("../Modal/ProductModel")
const catchAsync = require("../utils/catchAync");
const AppError = require('../Error-Handling/error')

const createProduct = catchAsync(async(req,res) =>{
    const product = await Product.create(req.body)
    console.log(product);
    res.status(201).json({
        data:product,
        message:'Product Created Successfully'
    })
})

const getAllProducts =catchAsync( async (req,res) =>{
    const products = await Product.find().populate({
        path:'productType',select:'productType'});
    if(!products) return next(new AppError("No Product to show",404))
    res.status(201).json({
        data:products,
        message:'All Product Displayed Successfully'
    })
})

const getProductById = catchAsync( async (req,res) =>{
    const products = await Product.findById(req.params.id).populate({
        path:'productType',select:'productType'});
    if(!products) return next(new AppError("No Product For the provided ID",404))
    res.status(201).json({
        data:products,
        message:'Successfully Executed'
    })
})

const updateProductById = catchAsync(async (req,res,next) =>{
    console.log(req.params.id)
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });
          if(!product){
              console.log('PRoducts',product)
            return next(new AppError("No Product For the provided ID",401))
          }
          res.status(201).json({
            data:product,
            message:'Successfully updated'
        })
    })


const deleteProduct = catchAsync(async(req,res) =>{
    await Product.findByIdAndDelete(req.params.id)
    res.status(201).json({
        data:null,
        message:'Successfully Deleted'
    })
})

const mostRecentProducts = catchAsync(async (req,res) =>{
    const mostRecetValue = await Product.find().sort({'timeStamp':-1}).limit(1)
    console.log(mostRecetValue)
    res.status(201).json({
        message:'This is Most recent Products',
        data:mostRecetValue,
    })
})

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProduct,
    mostRecentProducts
}