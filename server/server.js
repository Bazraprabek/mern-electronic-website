const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const router = require("./routes/router");
const port = process.env.PORT || 3000;
require("./config/db");

app.use("/public", express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(port, () => console.log(`Server running at ${port}`));
