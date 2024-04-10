const express = require("express");
const {
  updateUser,
  fetchAccount,
  deleteAccount,
  createAccount,
} = require("../controllers/user.controller");
const { admin } = require("../middleware/admin");
const { verify } = require("../middleware/auth");
const router = express();

router.put("/update", verify, updateUser);
router.post("/create", admin, createAccount);
router.get("/account", admin, fetchAccount);
router.delete("/delete/:id", admin, deleteAccount);

module.exports = router;
