const mongoose = require("mongoose");
const Product = require("./Product.model");

const orderSchema = new mongoose.Schema({
  customer_id: { type: String, required: true },
  address: { type: String, required: true },
  payment_type: { type: String, required: true },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  order_date: { type: Date, default: Date.now() },
});

const Order = mongoose.model.orders || mongoose.model("order", orderSchema);

module.exports = Order;
