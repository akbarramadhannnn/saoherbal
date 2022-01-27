const moment = require("moment");

const GenerateCodeTransaction = (consumer_type, id) => {
  const date = new Date();
  const prefix = consumer_type === "Store" ? `TK${id}` : `DS${id}`;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${prefix}${moment().format("DDMMYYYY")}${hours}${minutes}${seconds}`;
};

module.exports = GenerateCodeTransaction;
