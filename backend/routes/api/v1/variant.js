const router = require("express").Router();
const {
  getVariantList,
  addVariantList,
  updateVariantList,
  deleteVariantList,
} = require("../../../controller/variant");

router.get("/", getVariantList);
router.post("/", addVariantList);
router.put("/:id", updateVariantList);
router.delete("/:id", deleteVariantList);

module.exports = router;
