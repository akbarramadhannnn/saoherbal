const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
const {
  validationAddConfigure,
  validationAddConfigureDetail,
  validationUpdateConfigureDetail,
} = require("../../../middleware/validation/configure");
const {
  getConfigureListAll,
  addConfigure,
  addConfigureDetail,
  getAllConfigureDetail,
  updateConfigureDetail,
} = require("../../../controller/configure");

router.get("/", getToken, getConfigureListAll);
router.post("/", getToken, validationAddConfigure, RunValidation, addConfigure);
router.get("/detail", getToken, getAllConfigureDetail);
router.post(
  "/detail",
  getToken,
  validationAddConfigureDetail,
  RunValidation,
  addConfigureDetail
);
router.put(
  "/detail/:id",
  getToken,
  validationUpdateConfigureDetail,
  RunValidation,
  updateConfigureDetail
);
// router.put(
//   "/:id",
//   getToken,
//   validationUpdateCategory,
//   RunValidation,
//   updateCategoryList
// );
// router.delete("/:id", getToken, deleteCategoryList);
// router.get("/detail", getToken, detailCategory);

module.exports = router;
