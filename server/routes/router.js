const express = require("express");
const router = express();
const authRouter = require("./auth.router");
const productRouter = require("./product.router");
const orderRouter = require("./order.router");
const userRouter = require("./user.router");

router.use("/", authRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/user", userRouter);

module.exports = router;
