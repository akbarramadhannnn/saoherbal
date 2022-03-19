const router = require("express").Router();
// const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
// const {
//   validationAddCategory,
//   validationUpdateCategory,
// } = require("../../../middleware/validation/category");
const {
  getOperasionalCostList,
  getOperasionalCostDetail,
  addOperasionalCostDetail,
  updateOperasionalCost,
} = require("../../../controller/operasionalcost");

router.get("/", getToken, getOperasionalCostList);
router.post(
  "/",
  getToken,
  //   validationAddCategory,
  //   RunValidation,
  addOperasionalCostDetail
);
router.put(
  "/:id",
  getToken,
  //   validationUpdateCategory,
  //   RunValidation,
  updateOperasionalCost
);
// router.delete("/:id", getToken, deleteCategoryList);
router.get("/detail", getToken, getOperasionalCostDetail);

module.exports = router;
