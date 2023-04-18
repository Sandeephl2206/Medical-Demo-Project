const mongoose = require("mongoose");
const validator = require("validator");
// const ProductType = require("../Modal/productTypeModel")
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the Product Name"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide Price"],
    },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
    },
    photo: {
      type: String,
    },
    timeStamps: {
      type: Date,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.pre("save", function (next) {
  this.timeStamps = Date.now();
  next();
});


module.exports = mongoose.model("Product", ProductSchema);
