const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "15m" });
};

module.exports = { generateAccessToken };
