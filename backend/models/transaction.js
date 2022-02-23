const poolConnection = require("../connection/mysql2");

exports.getDataTransactionAll = async (
  userId,
  search,
  transactionType,
  start,
  limit
) => {
  if (search || transactionType || start || limit) {
    let sql;
    // let sqlStore;
    if (transactionType === "all") {
      // sql = `SELECT * FROM transaction WHERE status = '1' LIMIT ${limit} OFFSET ${start}`;
      // sqlDistributor = `SELECT transaction_id, distributor_id_transaction, store_id_transaction, bill_number_engineer_transaction, employee_id_transaction, code, consumer_type, transaction_type, total_paid_price, total_bill_price, subtotal_price, status, transaction.created_at, JSON_OBJECT('consumer_id', distributor.distributor_id, 'name', distributor.name, 'latitude', distributor.latitude, 'longitude', distributor.longitude) AS consumer FROM transaction INNER JOIN distributor ON transaction.distributor_id_transaction = distributor.distributor_id WHERE distributor.name LIKE N? AND status = '1' GROUP BY transaction.transaction_id LIMIT ${limit} OFFSET ${start}`;
      // sqlStore = `SELECT transaction_id, distributor_id_transaction, store_id_transaction, bill_number_engineer_transaction, employee_id_transaction, code, consumer_type, transaction_type, total_paid_price, total_bill_price, subtotal_price, status, transaction.created_at, JSON_OBJECT('consumer_id', store.store_id, 'name', store.name, 'latitude', store.latitude, 'longitude', store.longitude) AS consumer FROM transaction INNER JOIN store ON transaction.store_id_transaction = store.store_id WHERE store.name LIKE N? AND status = '1' GROUP BY transaction.transaction_id LIMIT ${limit} OFFSET ${start}`;
      sql = `SELECT transaction_id, distributor_id_transaction, store_id_transaction, bill_number_engineer_transaction, employee_id_transaction, code, consumer_type, transaction_type, total_paid_price, total_bill_price, subtotal_price, status, transaction.created_at, store.store_id AS storeId, distributor.distributor_id AS distributorId FROM transaction LEFT JOIN distributor ON transaction.distributor_id_transaction = distributor.distributor_id LEFT JOIN store ON transaction.store_id_transaction = store.store_id WHERE employee_id_transaction = ${userId} AND status = '1' AND (distributor.name LIKE N'%${search}%' OR store.name LIKE N'%${search}%') GROUP BY transaction.transaction_id LIMIT ${limit} OFFSET ${start}`;
    } else {
      // sql = `SELECT * FROM transaction WHERE transaction_type = '${transactionType}' AND status = '0' LIMIT ${limit} OFFSET ${start}`;
      // sqlDistributor = `SELECT transaction_id, distributor_id_transaction, store_id_transaction, bill_number_engineer_transaction, employee_id_transaction, code, consumer_type, transaction_type, total_paid_price, total_bill_price, subtotal_price, status, transaction.created_at, JSON_OBJECT('consumer_id', distributor.distributor_id, 'name', distributor.name, 'latitude', distributor.latitude, 'longitude', distributor.longitude) AS consumer FROM transaction INNER JOIN distributor ON transaction.distributor_id_transaction = distributor.distributor_id WHERE distributor.name LIKE N? AND transaction_type = '${transactionType}' AND status = '0' GROUP BY transaction.transaction_id LIMIT ${limit} OFFSET ${start}`;
      // sqlStore = `SELECT transaction_id, distributor_id_transaction, store_id_transaction, bill_number_engineer_transaction, employee_id_transaction, code, consumer_type, transaction_type, total_paid_price, total_bill_price, subtotal_price, status, transaction.created_at, JSON_OBJECT('consumer_id', store.store_id, 'name', store.name, 'latitude', store.latitude, 'longitude', store.longitude) AS consumer FROM transaction INNER JOIN store ON transaction.store_id_transaction = store.store_id WHERE store.name LIKE N? AND transaction_type = '${transactionType}' AND status = '0' GROUP BY transaction.transaction_id LIMIT ${limit} OFFSET ${start}`;
      sql = `SELECT transaction_id, distributor_id_transaction, store_id_transaction, bill_number_engineer_transaction, employee_id_transaction, code, consumer_type, transaction_type, total_paid_price, total_bill_price, subtotal_price, status, transaction.created_at, store.store_id AS storeId, distributor.distributor_id AS distributorId FROM transaction LEFT JOIN distributor ON transaction.distributor_id_transaction = distributor.distributor_id LEFT JOIN store ON transaction.store_id_transaction = store.store_id WHERE employee_id_transaction = ${userId} AND transaction_type = '${transactionType}' AND status = '0' AND (distributor.name LIKE N'%${search}%' OR store.name LIKE N'%${search}%') GROUP BY transaction.transaction_id LIMIT ${limit} OFFSET ${start}`;
    }
    const result = await poolConnection.query(sql);
    // const resultStore = await poolConnection.query(sqlStore, `%${search}%`);
    // console.log("resultDistributor", resultDistributor[0]);
    // console.log("resultStore", resultStore[0].length);
    // let result = [...resultDistributor[0]];
    // let result = [...resultDistributor[0], ...resultStore[0]];
    return result[0];
  } else {
    const sql = `SELECT * FROM transaction`;
    const result = await poolConnection.query(sql);
    return result[0];
  }
  // const sql = `SELECT * FROM transaction`;
  // const sql = `SELECT transaction.transaction_id, code, consumer_type, store_id_transaction, distributor_id_transaction, qty, subtotal, date_transaction, JSON_OBJECT('product_id', product.product_id, 'name', product.name) AS product, JSON_OBJECT('price_id', price.price_id, 'weight', price.weight, 'prices', price.prices, 'unit', price.unit) AS price FROM transaction JOIN product ON transaction.product_id_transaction = product.product_id JOIN price ON transaction.price_id_transaction = price.price_id`;
};

exports.getTotalDataTransaction = async (userId, search, transactionType) => {
  let sqlDistributor;
  let sqlStore;
  if (transactionType === "all") {
    sqlDistributor = `SELECT distributor.name AS name FROM transaction INNER JOIN distributor ON transaction.distributor_id_transaction = distributor.distributor_id WHERE name LIKE N? AND employee_id_transaction = ${userId} AND status = '1'`;
    sqlStore = `SELECT store.name AS name FROM transaction INNER JOIN store ON transaction.store_id_transaction = store.store_id WHERE name LIKE N? AND employee_id_transaction = ${userId} AND status = '1'`;
  } else {
    sqlDistributor = `SELECT distributor.name AS name FROM transaction INNER JOIN distributor ON transaction.distributor_id_transaction = distributor.distributor_id WHERE name LIKE N? AND employee_id_transaction = ${userId} AND transaction_type = '${transactionType}' AND status = '0'`;
    sqlStore = `SELECT store.name AS name FROM transaction INNER JOIN store ON transaction.store_id_transaction = store.store_id WHERE name LIKE N? AND employee_id_transaction = ${userId} AND transaction_type = '${transactionType}' AND status = '0'`;
  }
  const resultDistributor = await poolConnection.query(
    sqlDistributor,
    `%${search}%`
  );
  const resultStore = await poolConnection.query(sqlStore, `%${search}%`);
  const combine = [...resultDistributor[0], ...resultStore[0]];
  return combine.length;
};

// exports.getTotalDataTransaction = async (search) => {
//   // const sql = `SELECT COUNT(*) AS total FROM category WHERE name LIKE N?`;
//   // const result = await poolConnection.query(sql, `%${search}%`);
//   const sql = `SELECT COUNT(*) AS total FROM transaction`;
//   const result = await poolConnection.query(sql);
//   return result[0];
// };

exports.addDataTransaction = async (
  storeId,
  distributorId,
  billNumberEngineer,
  userId,
  code,
  consumerType,
  transactionType,
  subtotal,
  status
) => {
  let sql = "";
  if (transactionType === "tempo") {
    sql = `INSERT INTO transaction (store_id_transaction, distributor_id_transaction, bill_number_engineer_transaction, employee_id_transaction, code, consumer_type, transaction_type, total_bill_price, subtotal_price, status) values (${storeId}, ${distributorId}, '${billNumberEngineer}', ${userId}, '${code}', '${consumerType}', '${transactionType}', ${subtotal}, ${subtotal}, '${status}')`;
  } else {
    sql = `INSERT INTO transaction (store_id_transaction, distributor_id_transaction, bill_number_engineer_transaction, employee_id_transaction, code, consumer_type, transaction_type, subtotal_price, status) values (${storeId}, ${distributorId}, '${billNumberEngineer}', ${userId}, '${code}', '${consumerType}', '${transactionType}', ${subtotal}, '${status}')`;
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
  const sql = `SELECT transaction.transaction_id, code, store_id_transaction, distributor_id_transaction, bill_number_engineer_transaction, consumer_type, transaction_type, total_bill_price, total_paid_price, subtotal_price, status AS transactionStatus, created_at, JSON_ARRAYAGG(JSON_OBJECT('transactionDetailId', transaction_product_detail.transaction_product_detail_id, 'productId', transaction_product_detail.product_id_transaction_product_detail, 'priceId', transaction_product_detail.price_id_transaction_product_detail, 'discount', transaction_product_detail.discount, 'qty', transaction_product_detail.qty, 'sellPrice', transaction_product_detail.sell_price, 'totalPrice', transaction_product_detail.total_price, 'totalLeft', transaction_product_detail.total_left)) AS product FROM transaction LEFT JOIN transaction_product_detail ON transaction_product_detail.transaction_id_transaction_product_detail = transaction.transaction_id WHERE code = '${code}' GROUP BY transaction.transaction_id`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataBillAndBillTransaction = async (id, paid, bill) => {
  const sql = `UPDATE transaction SET total_paid_price = '${paid}', total_bill_price = ${bill} WHERE transaction_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateTotalPaidPriceTransaction = async (id, totalPaid) => {
  const sql = `UPDATE transaction SET total_paid_price = '${totalPaid}' WHERE transaction_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataStatusTransaction = async (id, status) => {
  const sql = `UPDATE transaction SET status = '${status}' WHERE transaction_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDetailTransactionProductById = async (id) => {
  const sql = `SELECT * FROM transaction_product_detail WHERE transaction_product_detail_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateTotalLefDetailProductById = async (id, totalLeft) => {
  const sql = `UPDATE transaction_product_detail SET total_left = ${totalLeft} WHERE transaction_product_detail_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataTransactionByDate = async (periodType, date) => {
  let result;
  if (periodType === "today") {
    // const sql = `SELECT transaction.transaction_id, consumer_type, status, transaction_product_detail.transaction_product_detail_id, transaction_product_detail.qty FROM transaction LEFT JOIN transaction_product_detail ON transaction_product_detail.transaction_id_transaction_product_detail = transaction.transaction_id WHERE DATE(created_at) = '${date}'`;
    const sql = `SELECT transaction.transaction_id, status, created_at, JSON_ARRAYAGG(JSON_OBJECT('detailId', transaction_product_detail.transaction_product_detail_id, 'productId', transaction_product_detail.product_id_transaction_product_detail, 'name', product.name, 'qty', transaction_product_detail.qty)) AS product FROM transaction LEFT JOIN transaction_product_detail ON transaction_product_detail.transaction_id_transaction_product_detail = transaction.transaction_id JOIN product ON transaction_product_detail.product_id_transaction_product_detail = product.product_id WHERE DATE(created_at) = '${date}' GROUP BY transaction.transaction_id`;
    result = await poolConnection.query(sql);
  }
  return result[0];
};
