const mongoose = require("mongoose");

const disLikeSchema = mongoose.Schema({
  productID: {
    type: String,
  },
  userID: {
    type: String,
  },
});

module.exports = mongoose.model("DisLike", disLikeSchema);
