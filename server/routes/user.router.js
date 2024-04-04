const express = require("express");
const {
  updateUser,
  fetchAccount,
  deleteAccount,
} = require("../controllers/user.controller");
const router = express();

router.put("/update", updateUser);
router.get("/account", fetchAccount);
router.delete("/delete/:id", deleteAccount);

module.exports = router;
