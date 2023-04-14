const mongoose = require('mongoose')

const productTypeSchema = mongoose.Schema({
  productType: {
    type:String,
    unique:[true,"Same Product-Type Already Exist"]
  }
})

module.exports = mongoose.model("ProductType",productTypeSchema)  