const { check } = require("express-validator");

exports.validationAddBill = [
  check("type").custom(async (value) => {
    if (!value) {
      throw new Error("Type is Required");
    }
  }),
];

exports.validationUpdatePaymentStatus = [
  check("type").custom(async (value) => {
    if (!value) {
      throw new Error("Type is Required");
    }
  }),
  check("paymentStatus").custom(async (value) => {
    if (!value) {
      throw new Error("Payment Status is Required");
    }
  }),
];
