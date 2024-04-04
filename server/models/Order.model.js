const mongoose = require("mongoose");
const Product = require("./Product.model");

const orderSchema = new mongoose.Schema({
  customer_id: { type: String, required: true },
  customer_name: { type: String, required: true },
  contact_number: { type: Number, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  payment_type: { type: String, required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  order_date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
