const Order = require("../models/Order.model");
const Product = require("../models/Product.model");
const { khaltiKPG } = require("../services/khalti");

const khalti = async (req, res) => {
  try {
    const response = await khaltiKPG();
    const result = await response.text();
    const resultObject = JSON.parse(result);

    if (resultObject.status_code === 401) {
      throw new Error("Unauthorized");
    }
    res.send(resultObject.payment_url);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const createOrder = async (req, res) => {
  try {
    const { products, customer_name, contact_number, district, address } =
      req.body;
    const customer_id = req.user.id;
    if (customer_id && address && products) {
      const order = await Order.create({
        customer_id,
        address,
        payment_type: "cash",
        products,
        customer_name,
        contact_number,
        district,
      });
      const updatePromises = products.map(async (value) => {
        const product = await Product.findOne({ _id: value.product_id });
        if (product) {
          product.stack -= value.quantity;
          await product.save();
        }
      });

      await Promise.all(updatePromises);

      res.status(200).json(order);
    } else {
      throw new Error("Enter all Fields");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Internal Server Error");
  }
};

const fetchOrder = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("products.product");
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    const orders = await Order.deleteOne({ _id });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(400).json({ error: "Failed to delete order" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = { khalti, createOrder, fetchOrder, deleteOrder };
