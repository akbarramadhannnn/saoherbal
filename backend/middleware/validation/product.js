const { check } = require("express-validator");

exports.validationAddProduct = [
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Product Name is Required");
    }
  }),

  check("category_id").custom(async (value) => {
    if (!value) {
      throw new Error("Category Id is Required");
    }
  }),

  check("variant_id").custom(async (value) => {
    if (!value) {
      throw new Error("Variant Id is Required");
    }
  }),

  check("description").custom(async (value) => {
    if (!value) {
      throw new Error("Description is Required");
    }
  }),

  check("priceList").custom(async (value) => {
    if (typeof value === "string") {
      throw new Error("Price List Type Not String");
    } else if (!value.length > 0) {
      throw new Error("Price List Not Length");
    } else {
      const filterUnit = value.filter((d) => !d.unit);
      const filterWeight = value.filter((d) => !d.weight);
      const filterPrice = value.filter((d) => !d.price);
      if (filterUnit.length > 0) {
        throw new Error("Price List Unit is Required ");
      } else if (filterWeight.length > 0) {
        throw new Error("Price List Weight is Required ");
      } else if (filterPrice.length > 0) {
        throw new Error("Price List Price is Required ");
      }
    }
  }),

  check("image").custom(async (value) => {
    if (!value) {
      throw new Error("Image is Required");
    }
  }),
];

exports.validationUpdateProduct = [
  check("name").custom(async (value) => {
    if (!value) {
      throw new Error("Product Name is Required");
    }
  }),

  check("category_id").custom(async (value) => {
    if (!value) {
      throw new Error("Category Id is Required");
    }
  }),

  check("variant_id").custom(async (value) => {
    if (!value) {
      throw new Error("Variant Id is Required");
    }
  }),

  check("description").custom(async (value) => {
    if (!value) {
      throw new Error("Description is Required");
    }
  }),

  check("priceList").custom(async (value) => {
    if (typeof value === "string") {
      throw new Error("Price List Type Not String");
    } else if (!value.length > 0) {
      throw new Error("Price List Not Length");
    } else {
      const filterUnit = value.filter((d) => !d.unit);
      const filterWeight = value.filter((d) => !d.weight);
      const filterPrice = value.filter((d) => !d.price);
      if (filterUnit.length > 0) {
        throw new Error("Price List Unit is Required ");
      } else if (filterWeight.length > 0) {
        throw new Error("Price List Weight is Required ");
      } else if (filterPrice.length > 0) {
        throw new Error("Price List Price is Required ");
      }
    }
  }),
];
