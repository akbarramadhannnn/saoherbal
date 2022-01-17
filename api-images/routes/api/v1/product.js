const express = require("express");
const router = express.Router();
const { uploadSingleImage, deleteSingleImage } = require("../../../controller/product");

router.post("/upload-single-image", uploadSingleImage);
router.delete("/delete-single-image/:name", deleteSingleImage);

module.exports = router;
