const router = require("express").Router();
const {
  uploadSingleImage,
  deleteSingleImage,
  generateFilePdf,
} = require("../../../controller/file");

router.post("/upload-single-image", uploadSingleImage);
router.post("/generate-pdf-invoice", generateFilePdf);
router.delete("/delete-single-image/:type/:name", deleteSingleImage);

module.exports = router;
