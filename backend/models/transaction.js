const poolConnection = require("../connection/mysql2");

exports.getDataTransactionAll = async () => {
  // const sql = `SELECT * FROM transaction`;
  const sql = `SELECT transaction.transaction_id, code, consumer_type, store_id_transaction, distributor_id_transaction, qty, subtotal, date_transaction, JSON_OBJECT('product_id', product.product_id, 'name', product.name) AS product, JSON_OBJECT('price_id', price.price_id, 'weight', price.weight, 'prices', price.prices, 'unit', price.unit) AS price FROM transaction JOIN product ON transaction.product_id_transaction = product.product_id JOIN price ON transaction.price_id_transaction = price.price_id`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataTransaction = async (
  store_id,
  distributor_id,
  product_id,
  price_id,
  code,
  consumer_type,
  qty,
  subtotal
) => {
  const sql = `INSERT INTO transaction (store_id_transaction, distributor_id_transaction, product_id_transaction, price_id_transaction, code, consumer_type, qty, subtotal) values (${store_id}, ${distributor_id}, ${product_id}, ${price_id}, '${code}', '${consumer_type}', ${qty}, ${subtotal})`;
  const result = await poolConnection.query(sql);
  return result;
};
