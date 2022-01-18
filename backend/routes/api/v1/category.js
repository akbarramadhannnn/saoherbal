const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
const {
  validationAddCategory,
  validationUpdateCategory,
} = require("../../../middleware/validation/category");
const {
  getCategoryList,
  addCategoryList,
  updateCategoryList,
  deleteCategoryList,
  detailCategory,
} = require("../../../controller/category");

router.get("/", getToken, getCategoryList);
router.post(
  "/",
  getToken,
  validationAddCategory,
  RunValidation,
  addCategoryList
);
router.put(
  "/:id",
  getToken,
  validationUpdateCategory,
  RunValidation,
  updateCategoryList
);
router.delete("/:id", getToken, deleteCategoryList);
router.get("/detail", getToken, detailCategory);

module.exports = router;
