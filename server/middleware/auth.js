const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const token = req.header("Authorization");
  // console.log("Token: ", token);

  if (!token) {
    return res.status(401).send({ message: "Access token is required" });
  }

  jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, user) => {
    if (err) {
      // console.log(err);
      return res.status(403).json({ message: "Invalid access token" });
    }

    req.user = user;
    next();
  });
};
module.exports = { verify };
