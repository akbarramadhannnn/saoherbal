const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
const {
  validationAddTransaction,
} = require("../../../middleware/validation/transaction");
const {
  getTransaction,
  addTransaction,
} = require("../../../controller/transaction");

router.get("/", getToken, getTransaction);
router.post(
  "/",
  getToken,
  validationAddTransaction,
  RunValidation,
  addTransaction
);
// router.put("/:id", updateCategoryList);
// router.delete("/:id", deleteCategoryList);
// router.get("/detail", detailCategory);

module.exports = router;