const express = require("express");
const router = express.Router();
const productController = require("../Controller/productController");
const likeController = require("../Controller/likeController");
const commentController = require("../Controller/commentController");
const AuthController = require("../Controller/AuthController");
const upload = require("../Middleware/fileUpload");

router
  .route("/")
  .post(upload.uploadUserPhoto, productController.createProduct)
  .get(productController.getAllProducts);


router.route("/recentProduct").get(productController.mostRecentProducts);
router.route("/mostLikedProducts").get(likeController.mostLikedProducts);

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProduct);

router
  .route("/getProductByProductType/:name")
  .get(productController.getProductByProductType);

router
  .route("/giveLike/:id")
  .get(AuthController.protectingRoutes, likeController.LikedProduct);

router
  .route("/dislike/:id")
  .get(AuthController.protectingRoutes, likeController.disLikedProduct);

router
  .route("/giveComment/:id")
  .post(AuthController.protectingRoutes, commentController.comment);

router.get("/showLike/:id", likeController.showlike);
module.exports = router;
