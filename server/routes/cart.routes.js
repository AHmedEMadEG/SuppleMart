const express = require("express");
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cart.controllers");
const router = express.Router();

router.get("/", getCartItems);
router.post("/", addToCart);
router.put("/", updateCartItem);
router.delete("/", removeCartItem);

module.exports = router;
