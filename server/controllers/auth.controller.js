const { generateAccessToken } = require("../config/jwt");
const User = require("../models/User.model");
const bycrptjs = require("bcryptjs");
const { sendMail } = require("../services/mailer");

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).send({
        message: "Please fill all fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid Credentials");
    }
    const isValid = await bycrptjs.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send("Invalid Credentials");
    }
    const accessToken = generateAccessToken(user._id);
    res.send({
      accessToken,
      role: user.role,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username && !email && !password) {
      return res.status(400).send({
        message: "Please fill all fields",
      });
    }
    const isUsernameExist = await User.findOne({ username });
    const isEmailExist = await User.findOne({ email });
    if (isUsernameExist) {
      return res.status(403).send("Username already exists");
    }
    if (isEmailExist) {
      return res.status(403).send("Email is already registered");
    }

    const user = await User.create({ username, email, password, role: "user" });
    if (user) {
      sendMail(user.username, user.email);
      res.send({
        message: "Signup Successful",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const fetchUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select([
      "-password",
      "-created_at",
      "-_id",
    ]);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const fetchAdmin = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).select([
      "-password",
      "-created_at",
      "-_id",
    ]);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { userLogin, userSignup, fetchUser, fetchAdmin };
