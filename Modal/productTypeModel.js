const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Same Product-Type Already Exist"],
  },
});

module.exports = new mongoose.model("ProductType", productTypeSchema);
