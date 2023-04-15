const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema({
  productID: {
    type: String,
  },
  userID: {
    type: String,
  },
});

module.exports = mongoose.model("Like", LikeSchema);
