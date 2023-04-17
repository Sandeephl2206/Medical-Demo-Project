const express = require("express");
const router = express.Router();
const UserController = require("../Controller/userController");
const productController = require("../Controller/productController");
const likeController = require("../Controller/likeController");
const commentController = require("../Controller/commentController");
const AuthController = require("../Controller/AuthController");
router.route("/recentProduct").get(productController.mostRecentProducts);
router
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProducts);
router.route("/mostLikedProducts").get(likeController.mostLikedProducts);
router
  .route("/:id")
  .get(productController.getProductById)
  .patch(productController.updateProductById)
  .delete(productController.deleteProduct);

router
  .route("/getProductByProductType/:name")
  .get(productController.getProductByProductType);

router
  .route("/giveLike/:id")
  .get( AuthController.protectingRoutes,likeController.LikedProduct);

router
  .route("/dislike/:id")
  .get( likeController.disLikedProduct);

router
  .route("/giveComment/:id")
  .post(commentController.comment);
// router.route("/getAllComments").get(commentController.getAllComments);

module.exports = router;
