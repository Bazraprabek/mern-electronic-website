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
    const {
      customer_id,
      products,
      customer_name,
      contact_number,
      district,
      address,
    } = req.body;
    console.log("Data:", req.body);
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
    res.status(400).send({ msg: "Fail to create" });
  }
};

module.exports = { khalti, createOrder };
