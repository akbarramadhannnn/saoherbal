const router = require("express").Router();
const {
  uploadSingleImage,
  deleteSingleImage,
  generateFilePdf,
} = require("../../../controller/file");
const Response = require("../../../helpers/response");

router.get("/", (req, res) => {
  return res.json(Response(true, 200, `root api file`, {}));
});
router.post("/upload-single-image", uploadSingleImage);
router.post("/generate-pdf-invoice", generateFilePdf);
router.delete("/delete-single-image/:type/:name", deleteSingleImage);

module.exports = router;
