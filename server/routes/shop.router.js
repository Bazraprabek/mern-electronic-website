const express = require("express");
const { khalti } = require("../controllers/shop.controller");
const router = express();

router.post("/pay/khalti", khalti);
router.get("/pay", khalti);

module.exports = router;
