const poolConnection = require("../connection/mysql2");

exports.getDataTransactionTitipDetailByTransactionIdAndDueDateId = async (
  transactionId,
  dueDateId
) => {
  const sql = `SELECT * FROM transaction_titip_detail WHERE id_transaction_titip_detail = ${transactionId} AND id_due_date_transaction_titip_detail = ${dueDateId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataTransactionTitipDetailByTransactionId = async (
  transactionId
) => {
  const sql = `SELECT * FROM transaction_titip_detail WHERE id_transaction_titip_detail = ${transactionId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addMultipleTransactionTitip = async (data) => {
  var sql =
    "INSERT INTO transaction_titip_detail (id_transaction_titip_detail, id_due_date_transaction_titip_detail, id_product_transaction_titip_detail, total_left, total_sell, total_price) VALUES ?";
  const result = await poolConnection.query(sql, [data]);
  return result[0];
};
