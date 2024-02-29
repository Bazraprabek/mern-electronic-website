const express = require("express");
const {
  userLogin,
  userSignup,
  fetchUser,
} = require("../controllers/auth.controller");
const { verify } = require("../middleware/auth");
const router = express();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/user", verify, fetchUser);

module.exports = router;
