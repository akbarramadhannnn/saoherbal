const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const {
  validationAddBill,
  validationUpdatePaymentStatus,
} = require("../../../middleware/validation/bill");
const {
  getBill,
  addBill,
  getDetailBill,
  updatePaymentStatusBill,
} = require("../../../controller/bill");
// const { getToken } = require("../../../middleware/auth");

router.get("/", getBill);
router.post("/", validationAddBill, RunValidation, addBill);
router.get("/detail", getDetailBill);
router.put(
  "/update-payment-status/:billNumber",
  validationUpdatePaymentStatus,
  RunValidation,
  updatePaymentStatusBill
);

module.exports = router;
