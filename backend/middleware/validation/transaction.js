const { check } = require("express-validator");

exports.validationAddTransaction = [
  check("consumer_type").custom(async (value) => {
    if (!value) {
      throw new Error("Consumer Type is Required");
    }
  }),
  check("transaction_type").custom(async (value) => {
    if (!value) {
      throw new Error("Transaction Type is Required");
    }
  }),
  check("dueDate").custom(async (value, { req }) => {
    const transaction_type = req.body.transaction_type;
    if (transaction_type === "titip" || transaction_type === "tempo") {
      if (value === undefined) {
        throw new Error("Due Date is Required");
      }
    }
  }),
  check("dueDate.startDate").custom(async (value, { req }) => {
    const dueDate = req.body.dueDate;
    if (dueDate) {
      if (!value) {
        throw new Error("Start Date is Required");
      }
    }
  }),
  check("dueDate.endDate").custom(async (value, { req }) => {
    const dueDate = req.body.dueDate;
    if (dueDate) {
      if (!value) {
        throw new Error("End Date is Required");
      }
    }
  }),
  check("productList").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Product List is Required");
    } else if (!value.length > 0) {
      throw new Error("Product List is Required Length");
    } else {
      const valueProductId = value.filter((d) => d.productId === "");
      const valuePriceId = value.filter((d) => d.priceId === "");
      const valueDiscount = value.filter((d) => d.discount === "");
      const valueQty = value.filter((d) => d.qty === "");
      if (valueProductId.length > 0) {
        throw new Error("Product Id is Required");
      } else if (valuePriceId.length > 0) {
        throw new Error("Price Id is Required");
      } else if (valueDiscount.length > 0) {
        throw new Error("Discount is Required");
      } else if (valueQty.length > 0) {
        throw new Error("Qty is Required");
      }
    }
  }),
];

exports.validationUpdateTempoTransaction = [
  check("description").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Description is Required");
    }
  }),
  check("paid").custom(async (value, { req }) => {
    if (value === "") {
      throw new Error("Paid is Required");
    }
  }),
  check("dueDateStatus").custom(async (value, { req }) => {
    if (value === "") {
      throw new Error("Due Date Status is Required");
    }
  }),
  check("coordinate").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Coordinate is Required");
    }
  }),
  check("coordinate.latitude").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Latitude is Required");
    }
  }),
  check("coordinate.longitude").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Longitude is Required");
    }
  }),
];

exports.validationAddDueDateTransaction = [
  check("type").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Type is Required");
    }
  }),
  check("transactionId").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Transaction Id is Required");
    }
  }),
  check("startDate").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Start Date is Required");
    }
  }),
  check("endDate").custom(async (value, { req }) => {
    if (value === "") {
      throw new Error("End Date is Required");
    }
  }),
];

exports.validationUpdateStatusTransaction = [
  check("status").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Status is Required");
    }
  }),
];

exports.validationAddTitipTransaction = [
  check("transactionId").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Transaction Id is Required");
    }
  }),
  check("dueDateId").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Due Date Id Id is Required");
    }
  }),
  check("coordinate").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Coordinate is Required");
    }
  }),
  check("coordinate.latitude").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Latitude is Required");
    }
  }),
  check("coordinate.longitude").custom(async (value, { req }) => {
    if (!value) {
      throw new Error("Longitude is Required");
    }
  }),
];
