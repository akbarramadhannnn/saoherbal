const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const {
  validationAddPengguna,
} = require("../../../middleware/validation/pengguna");
const { addPengguna } = require("../../../controller/pengguna");

// router.get("/", getCategoryList);
router.post("/", validationAddPengguna, RunValidation, addPengguna);
// router.put("/:id", updateCategoryList);
// router.delete("/:id", deleteCategoryList);
// router.get("/detail", detailCategory);

module.exports = router;
