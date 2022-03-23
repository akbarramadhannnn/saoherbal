const express = require("express");
const router = express.Router();
const {
  generateInvoiceTransaction,
  generateInvoiceTransactionTempo,
  generateInvoiceTransactionTitip,
  downloadInvoice
} = require("../../../controller/transaction");

router.post("/generate-invoice-transaction", generateInvoiceTransaction);
router.post("/generate-invoice-tempo", generateInvoiceTransactionTempo);
router.post("/generate-invoice-titip", generateInvoiceTransactionTitip);
router.get("/invoice-tempo/:name", downloadInvoice);

module.exports = router;
