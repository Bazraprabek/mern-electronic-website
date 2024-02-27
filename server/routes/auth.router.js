const express = require("express");
const { userLogin, userSignup } = require("../controllers/auth.controller");
const { sendMail } = require("../controllers/mailer");
const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignup);
router.get("/mail", sendMail);

module.exports = router;
