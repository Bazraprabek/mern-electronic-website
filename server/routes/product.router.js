const express = require("express");
const router = express();
const multer = require("multer");
const {
  fetchProducts,
  createProducts,
} = require("../controllers/product.controller");

// Multer File Upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post("/create", upload.single("product_image"), createProducts);
router.get("/", fetchProducts);

module.exports = router;
