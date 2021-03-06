const poolConnection = require("../connection/mysql2");

exports.getDataDueDateTransactionAll = async () => {
  const sql = `SELECT * FROM transaction_due_date`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getAllDataDueDateTransactionByStatus = async (status) => {
  const sql = `SELECT * FROM transaction_due_date WHERE status_transaction_due_date = '${status}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDueDateTransactionByTransactionId = async (transactionId) => {
  const sql = `SELECT * FROM transaction_due_date WHERE id_transaction_transaction_due_date = ${transactionId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDueDateDataTransactionIdStartDateEndDate = async (
  transactionId,
  startDate,
  endDate
) => {
  const sql = `INSERT INTO transaction_due_date (id_transaction_transaction_due_date, start_date, end_date) values (${transactionId}, '${startDate}', '${endDate}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDueDateById = async (id) => {
  const sql = `SELECT * FROM transaction_due_date WHERE transaction_due_date_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDueDateByIdAndTransactionId = async (
  dueDateId,
  transactionId
) => {
  const sql = `SELECT * FROM transaction_due_date WHERE transaction_due_date_id = ${dueDateId} AND id_transaction_transaction_due_date = ${transactionId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataDueDateById = async (id, visitDate, status) => {
  // let sql;
  // if (description === "" || paid === "") {
  //   sql = `UPDATE transaction_due_date SET status_transaction_due_date = '${status}' WHERE transaction_due_date_id = ${id}`;
  // } else {
  //   sql = `UPDATE transaction_due_date SET description = '${description}', paid = ${paid}, status_transaction_due_date = '${status}' WHERE transaction_due_date_id = ${id}`;
  // }
  //   sql = `UPDATE transaction_due_date SET description = '${description}', paid = ${paid}, status_transaction_due_date = '${status}' WHERE transaction_due_date_id = ${id}`;
  const sql = `UPDATE transaction_due_date SET status_transaction_due_date = '${status}', visit_date = '${visitDate}' WHERE transaction_due_date_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataDueDateStatusById = async (id, status) => {
  const sql = `UPDATE transaction_due_date SET status_transaction_due_date = '${status}' WHERE transaction_due_date_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateMultipleDataDueDateStatusById = async (data) => {
  const sql =
    "UPDATE transaction_due_date SET status_transaction_due_date = ? WHERE transaction_due_date_id = ?";
  const result = await poolConnection.query(sql, data);
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
