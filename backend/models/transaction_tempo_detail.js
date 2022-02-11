const poolConnection = require("../connection/mysql2");

exports.addDataTransactionTempoDetail = async (transactionId, dueDateId) => {
  const sql = `INSERT INTO transaction_tempo_detail (id_transaction_transaction_tempo_detail, id_due_date_transaction_tempo_detail) values (${transactionId}, ${dueDateId})`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataTransactionTempoDetailByDueDateId = async (dueDateId) => {
  const sql = `SELECT * FROM transaction_tempo_detail WHERE id_due_date_transaction_tempo_detail = ${dueDateId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataTempoDetailByTempoId = async (tempoDetailId) => {
  const sql = `SELECT * FROM transaction_tempo_detail WHERE transaction_tempo_detail_id = ${tempoDetailId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataTransactionTempoDetail = async (
  id,
  description,
  paidPrice,
  time
) => {
  const sql = `UPDATE transaction_tempo_detail SET description = '${description}', paid_price = ${paidPrice}, created_at = '${time}' WHERE transaction_tempo_detail_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getAllDataTempoDetailByTransactionId = async (transactionId) => {
  const sql = `SELECT * FROM transaction_tempo_detail WHERE id_transaction_transaction_tempo_detail = ${transactionId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
