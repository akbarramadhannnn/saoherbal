const { check } = require("express-validator");

exports.validationAddConfigure = [
  check("module").custom(async (value) => {
    if (!value) {
      throw new Error("Module is Required");
    }
  }),
  check("icon").custom(async (value) => {
    if (!value) {
      throw new Error("Icon is Required");
    }
  }),
];

exports.validationAddConfigureDetail = [
  check("configureId").custom(async (value) => {
    if (value === "") {
      throw new Error("Configure Id is Required");
    }
  }),
  check("name").custom(async (value) => {
    if (value === "") {
      throw new Error("Name is Required");
    }
  }),
  check("value").custom(async (value) => {
    if (value === "") {
      throw new Error("Value is Required");
    }
  }),
  check("description").custom(async (value) => {
    if (value === "") {
      throw new Error("Description is Required");
    }
  }),
];

exports.validationUpdateConfigureDetail = [
  check("configureId").custom(async (value) => {
    if (value === "") {
      throw new Error("Configure Id is Required");
    }
  }),
  check("name").custom(async (value) => {
    if (value === "") {
      throw new Error("Name is Required");
    }
  }),
  check("value").custom(async (value) => {
    if (value === "") {
      throw new Error("Value is Required");
    }
  }),
  check("description").custom(async (value) => {
    if (value === "") {
      throw new Error("Description is Required");
    }
  }),
];
