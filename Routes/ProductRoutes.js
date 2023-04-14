const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController")
const productController = require("../Controller/productController")

router.route("/recentProduct").get(productController.mostRecentProducts)
router.route("/").post(productController.createProduct).get(productController.getAllProducts)
router.route("/:id").get(productController.getProductById).patch(productController.updateProductById).delete(productController.deleteProduct)

module.exports = router;