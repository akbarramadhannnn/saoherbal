const { check } = require("express-validator");

exports.validationAddEmployee = [
  check("typeId").custom(async (value) => {
    if (!value) {
      throw new Error("Type Id is Required");
    }
  }),
  check("numberId").custom(async (value) => {
    if (!value) {
      throw new Error("Number Id is Required");
    }
  }),
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Category Name is Required");
    }
  }),
  check("email").custom(async (value) => {
    if (!value) {
      throw new Error("Email is Required");
    }
  }),
  check("gender").custom(async (value) => {
    if (!value) {
      throw new Error("Gender is Required");
    }
  }),
  check("placeOfDate").custom(async (value) => {
    if (!value) {
      throw new Error("Place of Date is Required");
    }
  }),
  check("birthOfDate").custom(async (value) => {
    if (!value) {
      throw new Error("Birth of Date is Required");
    }
  }),
  check("position").custom(async (value) => {
    if (!value) {
      throw new Error("Position is Required");
    }
  }),
  check("noTlp").custom(async (value) => {
    if (!value) {
      throw new Error("No Tlp is Required");
    }
  }),
  check("provinsiId").custom(async (value) => {
    if (!value) {
      throw new Error("Provinsi Id is Required");
    }
  }),
  check("kabupatenId").custom(async (value) => {
    if (!value) {
      throw new Error("Kabupaten Id is Required");
    }
  }),
  check("address").custom(async (value) => {
    if (!value) {
      throw new Error("Address is Required");
    }
  }),
  check("joinDate").custom(async (value) => {
    if (!value) {
      throw new Error("Ioin Date is Required");
    }
  }),
];

exports.validationUpdateEmployee = [
  check("typeId").custom(async (value) => {
    if (!value) {
      throw new Error("Type Id is Required");
    }
  }),
  check("numberId").custom(async (value) => {
    if (!value) {
      throw new Error("Number Id is Required");
    }
  }),
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Category Name is Required");
    }
  }),
  check("email").custom(async (value) => {
    if (!value) {
      throw new Error("Email is Required");
    }
  }),
  check("gender").custom(async (value) => {
    if (!value) {
      throw new Error("Gender is Required");
    }
  }),
  check("placeOfDate").custom(async (value) => {
    if (!value) {
      throw new Error("Place of Date is Required");
    }
  }),
  check("birthOfDate").custom(async (value) => {
    if (!value) {
      throw new Error("Birth of Date is Required");
    }
  }),
  check("position").custom(async (value) => {
    if (!value) {
      throw new Error("Position is Required");
    }
  }),
  check("noTlp").custom(async (value) => {
    if (!value) {
      throw new Error("No Tlp is Required");
    }
  }),
  check("provinsiId").custom(async (value) => {
    if (!value) {
      throw new Error("Provinsi Id is Required");
    }
  }),
  check("kabupatenId").custom(async (value) => {
    if (!value) {
      throw new Error("Kabupaten Id is Required");
    }
  }),
  check("address").custom(async (value) => {
    if (!value) {
      throw new Error("Address is Required");
    }
  }),
  check("joinDate").custom(async (value) => {
    if (!value) {
      throw new Error("Ioin Date is Required");
    }
  }),
];

exports.validationUpdateActiveEmployee = [
  check("active").custom(async (value) => {
    if (!value) {
      throw new Error("Active is Required");
    }
  }),
];
