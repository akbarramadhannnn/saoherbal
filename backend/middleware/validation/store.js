const { check } = require("express-validator");

exports.validationAddStore = [
  check("provinsi_id").custom(async (value) => {
    if (!value) {
      throw new Error("Provinsi Id is Required");
    }
  }),
  check("kabupaten_id").custom(async (value) => {
    if (!value) {
      throw new Error("Kabupaten Id is Required");
    }
  }),
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Store Name is Required");
    }
  }),
  check("email").custom(async (value) => {
    if (!value) {
      throw new Error("Email is Required");
    }
  }),
  check("no_tlp").custom(async (value) => {
    if (!value) {
      throw new Error("No Tlp is Required");
    }
  }),
  check("address").custom(async (value) => {
    if (!value) {
      throw new Error("Address is Required");
    }
  }),
];

exports.validationUpdateStore = [
  check("provinsi_id").custom(async (value) => {
    if (!value) {
      throw new Error("Provinsi Id is Required");
    }
  }),
  check("kabupaten_id").custom(async (value) => {
    if (!value) {
      throw new Error("Kabupaten Id is Required");
    }
  }),
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Store Name is Required");
    }
  }),
  check("email").custom(async (value) => {
    if (!value) {
      throw new Error("Email is Required");
    }
  }),
  check("no_tlp").custom(async (value) => {
    if (!value) {
      throw new Error("No Tlp is Required");
    }
  }),
  check("address").custom(async (value) => {
    if (!value) {
      throw new Error("Address is Required");
    }
  }),
];
