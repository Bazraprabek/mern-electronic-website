const express = require("express");
const {
  khalti,
  createOrder,
  fetchOrder,
  statusOrder,
  cancelOrder,
  fetchUserOrder,
} = require("../controllers/order.controller");
const { verify } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const router = express();

router.post("/pay/khalti", verify, khalti);
router.post("/pay/cash", verify, createOrder);
router.get("/", admin, fetchOrder);
router.post("/status", admin, statusOrder);
router.get("/user", verify, fetchUserOrder);
router.post("/cancel", verify, cancelOrder);

module.exports = router;
