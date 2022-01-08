const router = require("express").Router();
const {
  getCategoryList,
  addCategoryList,
  updateCategoryList,
  deleteCategoryList,
} = require("../../../controller/category");

router.get("/", getCategoryList);
router.post("/", addCategoryList);
router.put("/:id", updateCategoryList);
router.delete("/:id", deleteCategoryList);

module.exports = router;
