const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
