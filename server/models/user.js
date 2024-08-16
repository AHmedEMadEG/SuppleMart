const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchma = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

userSchma.pre("save", async function (req, res, next) {
  if (this.isModifies("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = model("User", userSchmea);

module.exports = User;
