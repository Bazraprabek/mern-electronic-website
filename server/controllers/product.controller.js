const Product = require("../models/Product.model");

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

const createProducts = async (req, res) => {
  try {
    const { product_name, price, description, stack } = req.body;
    const product_image = req.file.filename;
    // const product_image = req.file.buffer;
    if (product_name && product_image && price) {
      const products = await Product.create({
        product_name,
        product_image,
        price,
        description,
        stack,
      });
      res.status(200).json(products);
    } else {
      throw new Error("Enter all Fields");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: "Fail to create" });
  }
};

module.exports = { fetchProducts, createProducts };
