const express = require("express");
const { khalti, createOrder } = require("../controllers/order.controller");
const router = express();

router.post("/pay/khalti", khalti);
router.get("/pay", khalti);
router.post("/pay/cash", createOrder);

module.exports = router;
