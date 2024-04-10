const express = require("express");
const {
  userLogin,
  userSignup,
  fetchUser,
  fetchAdmin,
} = require("../controllers/auth.controller");
const { verify } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const router = express();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/user", verify, fetchUser);
router.get("/admin", admin, fetchAdmin);

module.exports = router;
