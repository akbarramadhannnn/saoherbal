const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const {
  validationAddVariant,
  validationUpdateVariant,
} = require("../../../middleware/validation/variant");
const {
  getVariantList,
  addVariantList,
  updateVariantList,
  deleteVariantList,
  detailVariant,
} = require("../../../controller/variant");

router.get("/", getVariantList);
router.post("/", validationAddVariant, RunValidation, addVariantList);
router.put("/:id", validationUpdateVariant, RunValidation, updateVariantList);
router.delete("/:id", deleteVariantList);
router.get("/detail", detailVariant);

module.exports = router;
