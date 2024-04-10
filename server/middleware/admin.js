const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const admin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ message: "Access token is required" });
  }

  jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, async (err, user) => {
    if (err) {
      // console.log(err);
      return res.status(403).json({ message: "Invalid access token" });
    }

    const isExist = await User.findOne({ _id: user.id });

    if (!isExist) {
      return res.status(403).json({ message: "Invalid User" });
    }

    if (isExist.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized User" });
    }

    req.user = user;
    next();
  });
};
module.exports = { admin };
