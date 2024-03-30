const jwt = require("jsonwebtoken");

const generateAccessToken = (username, id) => {
  return jwt.sign({ username, id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};

module.exports = { generateAccessToken };
