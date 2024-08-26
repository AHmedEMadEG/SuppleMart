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

    salesCount: {
      type: Number,
      default: 0,
    },

    rate: {
      type: Number,
      min: 0,
      max: 5,
    },

    categories: {
      type: [String],
    },

    thumbnail: {
      type: String,
    },

    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ categories: 1, price: 1, rate: 1 });

productSchema.index({ title: "text", description: "text" });

productSchema.pre("save", function () {
  if (!this.categories.includes("all")) {
    this.categories.push("all");
  }
});

//Generat virtuale property => formattedPrice = price.fixed(2)
productSchema.virtual("formattedPrice").get(function () {
  return `$${this.price.toFixed(2)}`;
});

const Product = model("Product", productSchema);

module.exports = Product;
