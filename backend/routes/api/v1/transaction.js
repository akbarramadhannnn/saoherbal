const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
const {
  validationAddTransaction,
  validationUpdateDueDateTransaction,
  validationAddDueDateTransaction,
  validationUpdateStatusTransaction,
} = require("../../../middleware/validation/transaction");
const {
  getTransaction,
  addTransaction,
  getDetailTransaction,
  updateDueDateTransaction,
  addDueDateTransaction,
  updateStatusTransaction,
} = require("../../../controller/transaction");

router.get("/", getToken, getTransaction);
router.post(
  "/",
  getToken,
  validationAddTransaction,
  RunValidation,
  addTransaction
);
router.post(
  "/due-date",
  getToken,
  validationAddDueDateTransaction,
  RunValidation,
  addDueDateTransaction
);
router.put(
  "/due-date/:id",
  getToken,
  validationUpdateDueDateTransaction,
  RunValidation,
  updateDueDateTransaction
);
router.put(
  "/update-status/:id",
  getToken,
  validationUpdateStatusTransaction,
  RunValidation,
  updateStatusTransaction
);
// router.delete("/:id", deleteCategoryList);
router.get("/detail", getToken, getDetailTransaction);

module.exports = router;
