const { check } = require("express-validator");

exports.validationAddVariant = [
  check("category_id").custom(async (value) => {
    if (!value) {
      throw new Error("Category is Required");
    }
  }),
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Variant Name is Required");
    }
  }),
];

exports.validationUpdateVariant = [
  check("category_id").custom(async (value) => {
    if (!value) {
      throw new Error("Category is Required");
    }
  }),
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Variant Name is Required");
    }
  }),
];
