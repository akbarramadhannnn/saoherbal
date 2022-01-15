const router = require("express").Router();
const {
  getCategoryList,
  addCategoryList,
  updateCategoryList,
  deleteCategoryList,
  detailCategory
} = require("../../../controller/category");

router.get("/", getCategoryList);
router.post("/", addCategoryList);
router.put("/:id", updateCategoryList);
router.delete("/:id", deleteCategoryList);
router.get("/detail", detailCategory);

module.exports = router;
