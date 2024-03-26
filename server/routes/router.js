const express = require("express");
const router = express();
const authRouter = require("./auth.router");
const productRouter = require("./product.router");
const orderRouter = require("./order.router");
const { verify } = require("../middleware/auth");

router.use("/", authRouter);
router.use("/product", productRouter);
router.use("/shop", orderRouter);

module.exports = router;
