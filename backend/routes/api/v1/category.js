const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
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

router.get("/", getCategoryList);
router.post("/", validationAddCategory, RunValidation, addCategoryList);
router.put("/:id", validationUpdateCategory, RunValidation, updateCategoryList);
router.delete("/:id", deleteCategoryList);
router.get("/detail", detailCategory);

module.exports = router;
