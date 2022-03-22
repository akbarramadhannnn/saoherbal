const express = require("express");
const router = express.Router();
const {
  generateInvoiceTransaction,
  generateInvoiceTransactionTempo,
  downloadInvoice
} = require("../../../controller/transaction");

router.post("/generate-invoice-transaction", generateInvoiceTransaction);
router.post("/generate-invoice-tempo", generateInvoiceTransactionTempo);
router.get("/invoice-tempo/:name", downloadInvoice);

module.exports = router;
