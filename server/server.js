const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const router = require("./routes/auth.router");
const port = process.env.PORT || 3000;
require("./config/db");

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(port, () => console.log(`Server running at ${port}`));
