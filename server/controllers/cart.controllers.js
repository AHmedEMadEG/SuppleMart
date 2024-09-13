const User = require("../models/user.model");
const Product = require("../models/product.model");
const CustomError = require("../utils/errors/CustomError");
const mongoose = require("mongoose");

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      throw new CustomError("quantity must be positve number", 400);
    }

    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      throw new CustomError("Product not found", 404);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    let cart = user.cart || [];

    const cartItemIndex = cart.findIndex(
      (item) => item.productId && item.productId.toString() === productId
    );

    if (cartItemIndex !== -1) {
      cart[cartItemIndex].quantity =
        Number(cart[cartItemIndex].quantity) + Number(quantity);
    } else {
      cart.push({ productId, quantity });
    }

    user.cart = cart;
    await user.save();

    res
      .status(201)
      .send({ success: "Product added to cart successfully", user });
  } catch (error) {
    next(error);
  }
};

const setCart = async (req, res, next) => {
  try {
    const { cart } = req.body;

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError("user not found", 404);
    }

    user.cart = cart.map((prod) => ({ ...prod }));

    await user.save();

    res
      .status(201)
      .send({ success: "cart has been successfully updated", cart });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CustomError("Invalid product ID", 400);
    }

    if (quantity <= 0) {
      throw new CustomError("Quantity must be greater than zero", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    const cartItem = user.cart.find(
      (item) => item.productId && item.productId.toString() === productId
    );

    if (!cartItem) {
      throw new CustomError("Product not found in cart", 404);
    }

    cartItem.quantity = quantity;
    await user.save();

    res.status(200).send({ success: "Cart item updated successfully", user });
  } catch (error) {
    next(error);
  }
};

const getCartItems = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new CustomError("Invalid user ID", 400);
    }

    const user = await User.findById(userId).populate({
      path: "cart.product", // Path to the product field inside the cart array
      select: "title price", // Model to use for populating
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ success: "Cart item retrived successfully", user });
  } catch (error) {
    next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new CustomError("Invalid product ID", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    user.cart = user.cart.filter(
      (item) => item.productId && item.productId.toString() !== productId
    );

    await user.save();

    res
      .status(200)
      .send({ success: "Cart item removed successfully", cart: user.cart });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartItems,
  setCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
