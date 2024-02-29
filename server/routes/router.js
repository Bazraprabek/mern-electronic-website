const express = require("express");
const router = express();
const authRouter = require("./auth.router");
const productRouter = require("./product.router");

router.use("/", authRouter);
router.use("/product", productRouter);

module.exports = router;
