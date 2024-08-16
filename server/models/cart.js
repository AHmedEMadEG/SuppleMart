const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

cartSchema.index({ userId: 1 });

cartSchema.virtual("totalPrice").get(function () {
  return this.items.reduce(
    (total, item) => total + item.count * item.productId.price,
    0
  );
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
