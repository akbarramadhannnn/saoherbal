const { check } = require("express-validator");

exports.validationSignin = [
  check("username").custom(async (value) => {
    if (!value) {
      throw new Error("Username is Required");
    }
  }),
  check("password").custom(async (value) => {
    if (!value) {
      throw new Error("Password is Required");
    }
  }),
];

// exports.validationUpdateCategory = [
//   check("name").custom(async (value) => {
//     if (!value) {
//       throw new Error("Category Name is Required");
//     }
//   }),
// ];
