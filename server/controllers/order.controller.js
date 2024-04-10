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
        status: "processing",
      });
      if (order) {
        const updatePromises = products.map(async (value) => {
          const product = await Product.findOne({ _id: value.product });
          if (product) {
            product.stock -= value.quantity;
            await product.save();
          }
        });

        await Promise.all(updatePromises);
      }

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
    const sortedOrders = orders.sort((a, b) => b.order_date - a.order_date);
    res.status(200).json(sortedOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const statusOrder = async (req, res) => {
  try {
    const { id, status } = req.body;
    const orders = await Order.findOneAndUpdate(
      { _id: id },
      { $set: { status } },
      { new: true }
    ).select(["-password", "-created_at", "-_id"]);
    if (orders) {
      if (orders.status === "canceled") {
        const updatePromises = orders.products.map(async (value) => {
          const product = await Product.findOne({ _id: value.product });
          if (product) {
            product.stock += value.quantity;
            await product.save();
          }
        });

        await Promise.all(updatePromises);
      }
      res.status(200).json(orders);
    } else {
      res.status(400).json({ error: "Failed to delete order" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

const fetchUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ customer_id: req.user.id }).populate(
      "products.product"
    );
    const sortedOrders = orders.sort((a, b) => b.order_date - a.order_date);
    res.status(200).json(sortedOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const orders = await Order.findOneAndUpdate(
      { _id: id },
      { $set: { status: "canceled" } },
      { new: true }
    ).select(["-password", "-created_at", "-_id"]);
    if (orders) {
      const updatePromises = orders.products.map(async (value) => {
        const product = await Product.findOne({ _id: value.product });
        if (product) {
          product.stock += value.quantity;
          await product.save();
        }
      });

      await Promise.all(updatePromises);

      res.status(200).json("Order Canceled");
    } else {
      res.status(400).json({ error: "Failed to delete order" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  khalti,
  createOrder,
  fetchOrder,
  statusOrder,
  cancelOrder,
  fetchUserOrder,
};
