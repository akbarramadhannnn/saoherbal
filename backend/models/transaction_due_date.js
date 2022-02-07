const poolConnection = require("../connection/mysql2");

exports.getDataDueDateTransactionByTransactionId = async (transactionId) => {
  const sql = `SELECT * FROM transaction_due_date WHERE transaction_id_transaction_due_date = ${transactionId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDueDateDataTransactionIdStartDateEndDate = async (
  transactionId,
  startDate,
  endDate
) => {
  const sql = `INSERT INTO transaction_due_date (transaction_id_transaction_due_date, start_date, end_date) values (${transactionId}, '${startDate}', '${endDate}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDueDateById = async (id) => {
  const sql = `SELECT * FROM transaction_due_date WHERE transaction_due_date_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

// exports.getDataCategoryByNameNotById = async (name, id) => {
//   const sql = `SELECT * FROM category WHERE name = '${name}' AND NOT category_id = ${id}`;
//   const result = await poolConnection.query(sql);
//   return result[0];
// };

// exports.getDataCategoryById = async (id) => {
//   const sql = `SELECT * FROM category WHERE category_id = ${id}`;
//   const result = await poolConnection.query(sql);
//   return result[0];
// };

exports.updateDataDueDateById = async (id, description, paid) => {
  const sql = `UPDATE transaction_due_date SET description = '${description}', paid = ${paid} WHERE transaction_due_date_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

// exports.deleteDataCategoryById = async (id) => {
//   const sql = `DELETE FROM category WHERE category_id = ${id}`;
//   const result = await poolConnection.query(sql);
//   return result[0];
// };

// exports.getDetailDataCategory = async (id) => {
//   const sql = `SELECT * FROM category WHERE category_id = ${id}`;
//   const result = await poolConnection.query(sql);
//   return result[0];
// };
