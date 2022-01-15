const router = require("express").Router();
const {
  getVariantList,
  addVariantList,
  updateVariantList,
  deleteVariantList,
  detailVariant,
} = require("../../../controller/variant");

router.get("/", getVariantList);
router.post("/", addVariantList);
router.put("/:id", updateVariantList);
router.delete("/:id", deleteVariantList);
router.get("/detail", detailVariant);

module.exports = router;
