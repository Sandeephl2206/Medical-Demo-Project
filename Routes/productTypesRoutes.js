const express = require("express");
const router = express.Router();

const productTypeController = require("../Controller/productTypeController");
router
  .route("/")
  .post(productTypeController.createProductType)
  .get(productTypeController.getAllProductType);

router.delete(
  "/deleteProductType/:name",
  productTypeController.deleteProductType
);

module.exports = router;
