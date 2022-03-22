const poolConnection = require("../connection/mysql2");

exports.getDataTransactionProductDetailByTransactionId = async (
  transactionId
) => {
  const sql = `SELECT * FROM transaction_product_detail WHERE transaction_id_transaction_product_detail = ${transactionId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
