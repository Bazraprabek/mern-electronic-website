const User = require("../models/User.model");

const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    console.log(req.user);

    if (username && email) {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: { username, email } },
        { new: true }
      ).select(["-password", "-created_at", "-_id"]);

      if (updateUser) {
        console.log("UpdateUser:", updateUser);
        res.send(updateUser);
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

module.exports = { updateUser };
