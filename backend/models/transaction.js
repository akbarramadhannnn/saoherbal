const poolConnection = require("../connection/mysql2");

exports.getDataTransactionAll = async () => {
  // const sql = `SELECT * FROM transaction`;
  // const sql = `SELECT transaction.transaction_id, code, consumer_type, store_id_transaction, distributor_id_transaction, qty, subtotal, date_transaction, JSON_OBJECT('product_id', product.product_id, 'name', product.name) AS product, JSON_OBJECT('price_id', price.price_id, 'weight', price.weight, 'prices', price.prices, 'unit', price.unit) AS price FROM transaction JOIN product ON transaction.product_id_transaction = product.product_id JOIN price ON transaction.price_id_transaction = price.price_id`;
  const sql = `SELECT * FROM transaction`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataTransaction = async (
  storeId,
  distributorId,
  billNumberEngineer,
  code,
  consumerType,
  transactionType,
  subtotal,
  status
) => {
  let sql = "";
  if (transactionType === "tempo") {
    sql = `INSERT INTO transaction (store_id_transaction, distributor_id_transaction, bill_number_engineer_transaction, code, consumer_type, transaction_type, bill_total, subtotal, status) values (${storeId}, ${distributorId}, '${billNumberEngineer}', '${code}', '${consumerType}', '${transactionType}', ${subtotal}, ${subtotal}, '${status}')`;
  } else {
    sql = `INSERT INTO transaction (store_id_transaction, distributor_id_transaction, bill_number_engineer_transaction, code, consumer_type, transaction_type, subtotal, status) values (${storeId}, ${distributorId}, '${billNumberEngineer}', '${code}', '${consumerType}', '${transactionType}', ${subtotal}, '${status}')`;
  }
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addMultipleDetailTransactionProduct = async (data) => {
  var sql =
    "INSERT INTO transaction_product_detail (transaction_id_transaction_product_detail, product_id_transaction_product_detail, price_id_transaction_product_detail, discount, qty, sell_price, total_price) VALUES ?";
  const result = await poolConnection.query(sql, [data]);
  return result[0];
};

exports.addDueDateTransaction = async (transactionId, startDate, endDate) => {
  const sql = `INSERT INTO transaction_due_date (transaction_id_transaction_due_date, start_date, end_date) values (${transactionId}, '${startDate}', '${endDate}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataTransactionById = async (id) => {
  const sql = `SELECT * FROM transaction WHERE transaction_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataTransactionByCode = async (code) => {
  // const sql = `SELECT transaction.transaction_id, code, consumer_type, store_id_transaction, distributor_id_transaction, qty, subtotal, date_transaction, JSON_OBJECT('product_id', product.product_id, 'name', product.name) AS product, JSON_OBJECT('price_id', price.price_id, 'weight', price.weight, 'prices', price.prices, 'unit', price.unit) AS price FROM transaction JOIN product ON transaction.product_id_transaction = product.product_id JOIN price ON transaction.price_id_transaction = price.price_id WHERE code = '${code}'`;
  const sql = `SELECT transaction.transaction_id, code, store_id_transaction, distributor_id_transaction, bill_number_engineer_transaction, consumer_type, transaction_type, bill_total, paid_total, subtotal, status AS transactionStatus, date_transaction, JSON_ARRAYAGG(JSON_OBJECT('transactionDetailId', transaction_product_detail.transaction_product_detail_id, 'productId', transaction_product_detail.product_id_transaction_product_detail, 'priceId', transaction_product_detail.price_id_transaction_product_detail, 'discount', transaction_product_detail.discount, 'qty', transaction_product_detail.qty, 'sellPrice', transaction_product_detail.sell_price, 'totalPrice', transaction_product_detail.total_price)) AS product FROM transaction LEFT JOIN transaction_product_detail ON transaction_product_detail.transaction_id_transaction_product_detail = transaction.transaction_id WHERE code = '${code}' GROUP BY transaction.transaction_id`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataBillAndBillTransaction = async (id, paid, bill) => {
  const sql = `UPDATE transaction SET paid_total = '${paid}', bill_total = ${bill} WHERE transaction_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataStatusTransaction = async (id, status) => {
  const sql = `UPDATE transaction SET status = '${status}' WHERE transaction_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
