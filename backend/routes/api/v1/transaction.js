const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
const {
  validationAddTransaction,
  validationUpdateTempoTransaction,
  validationAddDueDateTransaction,
  validationUpdateStatusTransaction,
  validationAddTitipTransaction,
} = require("../../../middleware/validation/transaction");
const {
  getTransaction,
  addTransaction,
  getDetailTransaction,
  updateTempoTransaction,
  addDueDateTransaction,
  updateStatusTransaction,
  addTitipTransaction,
  checkDueDateStatus
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
  "/tempo/:id",
  getToken,
  validationUpdateTempoTransaction,
  RunValidation,
  updateTempoTransaction
);
router.put(
  "/update-status/:id",
  getToken,
  validationUpdateStatusTransaction,
  RunValidation,
  updateStatusTransaction
);
router.get("/check-due-date-status", checkDueDateStatus);
router.get("/detail", getToken, getDetailTransaction);
router.post(
  "/titip",
  getToken,
  validationAddTitipTransaction,
  RunValidation,
  addTitipTransaction
);

module.exports = router;
