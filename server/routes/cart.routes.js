const express = require("express");
const {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  setCart,
} = require("../controllers/cart.controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth , getCartItems);
router.post("/add", auth, addToCart);
router.post("/setCart", auth, setCart);
router.put("/update", auth, updateCartItem);
router.delete("/:productId", auth, removeCartItem);
module.exports = router;
