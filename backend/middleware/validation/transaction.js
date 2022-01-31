const { check } = require("express-validator");

exports.validationAddTransaction = [
  check("consumer_type").custom(async (value) => {
    if (!value) {
      throw new Error("Consumer Type is Required");
    }
  }),
  check("product_id").custom(async (value) => {
    if (!value) {
      throw new Error("Product Id is Required");
    }
  }),
  check("price_id").custom(async (value) => {
    if (!value) {
      throw new Error("Price Id is Required");
    }
  }),
  check("qty").custom(async (value) => {
    if (!value) {
      throw new Error("Qty is Required");
    }
  }),
];
