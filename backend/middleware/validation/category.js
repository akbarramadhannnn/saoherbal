const { check } = require("express-validator");

exports.validationAddCategory = [
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Category Name is Required");
    }
  }),
];

exports.validationUpdateCategory = [
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Category Name is Required");
    }
  }),
];
