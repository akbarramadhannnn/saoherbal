const { check } = require("express-validator");
const {
  RegexLatitude,
  RegexLongitude,
  RegexEmail,
} = require("../../utils/regex");

exports.validationAddDistributor = [
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Store Name is Required");
    }
  }),
  check("email").custom(async (value) => {
    const cekRegexEmail = RegexEmail(value);

    if (!value) {
      throw new Error("Email is Required");
    }

    if (cekRegexEmail === false) {
      throw new Error("Email Not Valid");
    }
  }),
  check("no_tlp").custom(async (value) => {
    if (!value) {
      throw new Error("No Tlp is Required");
    }
  }),
  check("provinsi_id").custom(async (value) => {
    if (!value) {
      throw new Error("Provinsi is Required");
    }
  }),
  check("kabupaten_id").custom(async (value) => {
    if (!value) {
      throw new Error("Kabupaten is Required");
    }
  }),
  check("address").custom(async (value) => {
    if (!value) {
      throw new Error("Address is Required");
    }
  }),
  check("latitude").custom(async (value) => {
    if (!value) {
      throw new Error("Latitude is Required");
    } else if (!RegexLatitude(value)) {
      throw new Error("Latitude Wrong");
    }
  }),
  check("longitude").custom(async (value) => {
    if (!value) {
      throw new Error("Longitude is Required");
    } else if (!RegexLongitude(value)) {
      throw new Error("Longitude Wrong");
    }
  }),
];

exports.validationUpdateDistributor = [
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
  check("provinsi_id").custom(async (value) => {
    if (!value) {
      throw new Error("Provinsi is Required");
    }
  }),
  check("kabupaten_id").custom(async (value) => {
    if (!value) {
      throw new Error("Kabupaten is Required");
    }
  }),
  check("address").custom(async (value) => {
    if (!value) {
      throw new Error("Address is Required");
    }
  }),
  check("latitude").custom(async (value) => {
    if (!value) {
      throw new Error("Latitude is Required");
    } else if (!RegexLatitude(value)) {
      throw new Error("Latitude Wrong");
    }
  }),
  check("longitude").custom(async (value) => {
    if (!value) {
      throw new Error("Longitude is Required");
    } else if (!RegexLongitude(value)) {
      throw new Error("Longitude Wrong");
    }
  }),
];
