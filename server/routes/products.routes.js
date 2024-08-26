const express = require("express");
const {
  createProduct,
  getHomeProducts,
  getCategories,
  getBestSellingProducts,
  getLatestDealProduct,
  getHomeRecommendedProducts,
  getPaginatedProducts,
  addCategory,
} = require("../controllers/products.controllers");
const upload = require("../utils/multerConfig");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createProduct
); // auth and restrectedTo middlwares are required

router.get("/", getHomeProducts);

router.get("/categories", getCategories);

router.post("/category", addCategory);

router.get("/bestSelling", getBestSellingProducts);

router.get("/latestDealProduct/:title", getLatestDealProduct);

router.get("/homeRecommendedProducts", getHomeRecommendedProducts);

router.get("/shop/:category?", getPaginatedProducts);

module.exports = router;
