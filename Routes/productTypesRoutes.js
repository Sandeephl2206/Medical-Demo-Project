const express = require("express");
const router = express.Router();
// const commentController = require("./../Controller/commentController");
// const UserController = require("../Controller/userController");
const productTypeController = require("../Controller/productTypeController");
router
  .route("/")
  .post(productTypeController.createProductType)
  .get(productTypeController.getAllProductType);
// router.route("/:id").get(productTypeController.getProductById).patch(productTypeController.updateProductById).delete(productTypeController.deleteProduct)

module.exports = router;
