const poolConnection = require("../connection/mysql2");

exports.getDataBillEngineer = async () => {
  const sql = `SELECT * FROM bill_engineer`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataBillEngineerByBillNumber = async (billNumber) => {
  const sql = `SELECT * FROM bill_engineer WHERE bill_number = '${billNumber}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataBillEngineer = async (billNumber, firstDay, lastDay) => {
  const sql = `INSERT INTO bill_engineer (bill_number, first_day, last_day) values (${billNumber}, '${firstDay}', '${lastDay}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getBillNumberByFirstDayAndLastDay = async (firstDay, lastDay) => {
  const sql = `SELECT bill_number, payment_status FROM bill_engineer WHERE first_day >= '${firstDay}' AND last_day <= '${lastDay}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getBillNumberByBillNumber = async (billNumber) => {
  const sql = `SELECT bill_engineer.bill_number FROM bill_engineer WHERE bill_engineer.bill_number = '${billNumber}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDetailByBillNumber = async (billNumber) => {
  // const sql = `SELECT bill_engineer_id, bill_engineer.bill_number, payment_status, JSON_ARRAYAGG(JSON_OBJECT('transaction_id', transaction.transaction_id, 'code', transaction.code, 'bill_number', transaction.bill_number_engineer_transaction, 'product_id', transaction.product_id_transaction, 'qty', transaction.qty, 'transaction_date', transaction.date_transaction)) AS transaction FROM bill_engineer LEFT JOIN transaction ON transaction.bill_number_engineer_transaction = bill_engineer.bill_number WHERE bill_engineer.bill_number = '${billNumber}' GROUP BY bill_engineer.bill_number`;
  const sql = `SELECT bill_engineer_id, bill_engineer.bill_number, payment_status, first_day, last_day, JSON_ARRAYAGG(JSON_OBJECT('transaction_id', transaction.transaction_id, 'code', transaction.code, 'bill_number', transaction.bill_number_engineer_transaction, 'product', JSON_OBJECT('product_id', product.product_id, 'name', product.name), 'qty', transaction.qty, 'transaction_date', transaction.date_transaction)) AS transaction FROM bill_engineer LEFT JOIN transaction ON transaction.bill_number_engineer_transaction = bill_engineer.bill_number LEFT JOIN product ON transaction.product_id_transaction = product.product_id WHERE bill_engineer.bill_number = '${billNumber}' GROUP BY bill_engineer.bill_number`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateStatusPaymentBillEngineer = async (billNumber, status) => {
  const sql = `UPDATE bill_engineer SET payment_status = '${status}' WHERE bill_number = ${billNumber}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
