const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true, trim: true },
  product_image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  stack: { type: Number, default: 1 },
  created_at: { type: Date, default: Date.now() },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
