const express = require("express");
const {
  khalti,
  createOrder,
  fetchOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const router = express();

router.post("/pay/khalti", khalti);
router.post("/pay/cash", createOrder);
router.get("/", fetchOrder);
router.delete("/delete/:id", deleteOrder);

module.exports = router;
