const User = require("../models/User.model");
const { sendMail } = require("../services/mailer");

const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (username && email) {
      const isExist = await User.find({
        username,
      });
      if (isExist.length > 0) {
        return res.status(400).send({
          message: "Username is already registered!",
        });
      }
      const updateUser = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { username, email } },
        { new: true }
      ).select(["-password", "-created_at", "-_id"]);

      if (updateUser) {
        res.status(200).send(updateUser);
      } else {
        res.status(400).send({
          message: "Update Fail",
        });
      }
    } else {
      res.status(400).send({
        message: "Please fill all fields",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

const fetchAccount = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
  }
};

const createAccount = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
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

    const user = await User.create({ username, email, password, role });
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

const deleteAccount = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.deleteOne({ _id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: "Failed to delete account" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

module.exports = { updateUser, fetchAccount, deleteAccount, createAccount };
