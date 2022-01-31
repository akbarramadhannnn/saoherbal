const express = require("express");
const router = express.Router();
const {
  uploadSingleImage,
  deleteSingleImage,
  generateFilePdf,
} = require("../../../controller/product");

router.post("/upload-single-image", uploadSingleImage);
router.post("/generate-pdf-invoice", generateFilePdf);
router.delete("/delete-single-image/:name", deleteSingleImage);

module.exports = router;
