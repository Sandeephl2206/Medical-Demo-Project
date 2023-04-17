const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be Provided"],
    unique: [true, "Product-Type Already Exist"],
  },
});

module.exports = new mongoose.model("ProductType", productTypeSchema);
