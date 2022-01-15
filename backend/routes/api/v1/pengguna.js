const router = require("express").Router();
const { addPengguna } = require("../../../controller/pengguna");

// router.get("/", getCategoryList);
router.post("/", addPengguna);
// router.put("/:id", updateCategoryList);
// router.delete("/:id", deleteCategoryList);
// router.get("/detail", detailCategory);

module.exports = router;
