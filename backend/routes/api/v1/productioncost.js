const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
const {
  validationAddCategory,
  validationUpdateCategory,
} = require("../../../middleware/validation/category");
const {
  getProductionCostList,
  getProductionCostDetail,
  addProductionCostDetail,
  updateProductionCost,
} = require("../../../controller/productioncost");

router.get("/", getToken, getProductionCostList);
router.post(
  "/",
  getToken,
  //   validationAddCategory,
  //   RunValidation,
  addProductionCostDetail
);
router.put(
  "/:id",
  getToken,
  //   validationUpdateCategory,
  //   RunValidation,
  updateProductionCost
);
// router.delete("/:id", getToken, deleteCategoryList);
router.get("/detail", getToken, getProductionCostDetail);

module.exports = router;
