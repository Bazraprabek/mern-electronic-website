const Product = require("../models/Product.model");
const fs = require("fs");

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch products" });
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

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.find({ _id: id });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const filePath = "public/upload/" + product[0].product_image;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).send("Error deleting file");
      }
    });

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      return res.status(200).send("Deleted Successful");
    } else {
      return res.status(404).send("Product not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ msg: "Fail to delete" });
  }
};

module.exports = { fetchProducts, createProducts, deleteProduct };
