const mongoose = require("mongoose");
const validator = require("validator");
// const ProductType = require("../Modal/productTypeModel")
const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the username"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide Price Address"],
    },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
    },
    // likes: {
    //   type: Boolean,
    //   default: false,
    // },
    dislikes: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: String,
    },
    photo: {
      type: String,
      default: "no photo",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

ProductSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "productID",
});

// ProductSchema.virtual("dislikes", {
//   ref: "DisLike",
//   localField: "_id",
//   foreignField: "productID",
// });

// ProductSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "productID",
// });

module.exports = mongoose.model("Product", ProductSchema);
