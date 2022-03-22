const router = require("express").Router();
const {
  uploadSingleImage,
  deleteSingleImage,
} = require("../../../controller/file");
const transaction = require('./transaction');
const Response = require("../../../helpers/response");

router.get("/", (req, res) => {
  return res.json(Response(true, 200, `root api file`, {}));
});
router.post("/upload-single-image", uploadSingleImage);
router.delete("/delete-single-image/:type/:name", deleteSingleImage);
router.use('/transaction', transaction);

module.exports = router;
