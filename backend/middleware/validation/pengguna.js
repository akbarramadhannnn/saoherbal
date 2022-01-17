const { check } = require("express-validator");

exports.validationAddPengguna = [
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Name is Required");
    }
  }),
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
  check("role").custom(async (value) => {
    if (!value) {
      throw new Error("Role is Required");
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
