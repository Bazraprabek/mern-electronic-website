const express = require("express");
const { updateUser } = require("../controllers/user.controller");
const router = express();

router.put("/update", updateUser);

module.exports = router;
