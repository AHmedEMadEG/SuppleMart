const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");
const jwtSign = util.promisify(jwt.sign);
const { createUserSchema } = require("../utils/validations/users.validation");
const CustomError = require("../utils/errors/CustomError");
const Product = require("../models/product.model");

exports.signup = async (req, res, next) => {
  try {
    const { error } = await createUserSchema.validateAsync(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send("Email is already used.");

    const user = new User({ name, email, password });
    await user.save();
    res.send({ success: "User created", user });
  } catch (error) {
    throw new CustomError(error.details[0].message, 500);
  }
};

const mergeNonLoggedInUserCart = async (userId, cartItems) => {
  if (!Array.isArray(cartItems)) {
    throw new CustomError("Invalid cart data", 400);
  }

  for (let item of cartItems) {
    if (
      !item.productId ||
      typeof item.quantity !== "number" ||
      item.quantity <= 0
    ) {
      throw new CustomError("Invalid productId or quantity", 400);
    }
  }

  const user = await User.findById(userId);

  const userCartMap = new Map(user.cart.map((item) => [item.productId, item]));

  for (let item of cartItems) {
    if (userCartMap.has(item.productId)) {
      userCartMap.get(item.productId).quantity += item.quantity;
    } else {
      user.cart.push({ productId: item.productId, quantity: item.quantity });
    }
  }

  return await user.save();
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, cart } = req.body;

    let user = await User.findOne({ email });
    if (!user) throw new CustomError("invalid email or password", 400);
    // valid email
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      // correct email and password
      const token = await jwtSign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );

      if (cart?.length) {
        user = await mergeNonLoggedInUserCart(user._id, req.body.cart);
      }

      res.send({ success: "user logged in", token, user });
    } else {
      res.send({ error: "invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

exports.createAdmin = async (req, res, next) => {
  try {
    const { error } = await createUserSchema.validateAsync(req.body);

    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send("Email is Already Used.");
    const user = new User({ name, email, password, role: "admin" });
    await user.save();
    res.status(201).send({ success: "Admin Created", user });
  } catch (error) {
    next(error);
  }
};
