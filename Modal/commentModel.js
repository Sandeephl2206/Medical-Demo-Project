const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    product_id: {
      type: String
    },
    comment: {
      type: String,
      trim: true,
    },
  },
);

module.exports = mongoose.model("Comment", commentSchema);