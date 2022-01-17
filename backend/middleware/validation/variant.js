const { check } = require("express-validator");

exports.validationAddVariant = [
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Variant Name is Required");
    }
  }),
];

exports.validationUpdateVariant = [
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Variant Name is Required");
    }
  }),
];
