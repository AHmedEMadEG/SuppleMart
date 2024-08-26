const Product = require("../models/product.model");

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    const cartItemIndex = cart.findIndex(
      (item) => item.productId === productId
    );

    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity =
        Number(cart[cartItemIndex].quantity) + Number(quantity);
    } else {
      cart.push({ productId: productId, quantity });
    }

    res.cookie("cart", JSON.stringify(cart), { httpOnly: true, path: "/" });
    res
      .status(201)
      .send({ message: "Product added to cart successfully", cart });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    const cartItem = cart.find((item) => item.productId === productId);

    if (cartItem) {
      cartItem.quantity = quantity;
      res.cookie("cart", JSON.stringify(cart), { httpOnly: true });
      res.status(200).send({ message: "Cart item updated successfully", cart });
    } else {
      res.status(404).send({ message: "Item not found in cart" });
    }
  } catch (error) {
    next(error);
  }
};

const getCartItems = (req, res, next) => {
  try {
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    res.status(200).send(cart);
  } catch (error) {
    next(error);
  }
};

const removeCartItem = (req, res, next) => {
  try {
    const { productId } = req.body;
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    cart = cart.filter((item) => item.productId !== productId);
    res.cookie("cart", JSON.stringify(cart), { httpOnly: true });
    res
      .status(200)
      .send({ message: "Item removed from cart successfully", cart });
  } catch (error) {
    next(error);
  }
};
module.exports = { getCartItems, addToCart, updateCartItem, removeCartItem };
