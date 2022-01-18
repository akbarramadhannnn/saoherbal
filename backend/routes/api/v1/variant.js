const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
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

router.get("/", getToken, getVariantList);
router.post("/", getToken, validationAddVariant, RunValidation, addVariantList);
router.put(
  "/:id",
  getToken,
  validationUpdateVariant,
  RunValidation,
  updateVariantList
);
router.delete("/:id", getToken, deleteVariantList);
router.get("/detail", getToken, detailVariant);

module.exports = router;
