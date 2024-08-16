const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      maxLength: 500,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    count: {
      type: Number,
      required: true,
      min: 0,
    },

    rate: {
      type: Number,
    },

    tags: {
      type: [String],
      default: [],
    },

    thumbnail: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ title: 1 });
productSchema.index({ tags: 1 });

//generat virtuale property => formattedPrice == price.fixed(2)
productSchema.virtual("formattedPrice").get(function () {
  return `$${this.price.toFixed(2)}`;
});

const Product = model("Product", productSchema);

module.exports = Product;
