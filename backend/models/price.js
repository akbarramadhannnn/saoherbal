// const mysqlConnection = require("../connection/mysql");
const poolConnection = require("../connection/mysql2");

exports.addMultipleDataPrice = async (data) => {
  var sql = "INSERT INTO price (product_id, weight, prices, unit) VALUES ?";
  // mysqlConnection.query(sql, [data], (err, result) => {
  //   callback(err, result);
  // });
  const result = await poolConnection.query(sql, [data]);
  return result[0];
};

exports.getPriceByProductId = async (id) => {
  const sql = `SELECT * FROM price WHERE product_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateMultipleDataPrice = async (data) => {
  var sql =
    "UPDATE price SET weight = ? , prices = ? , unit = ? WHERE price_id = ?";
  // mysqlConnection.query(sql, data, (err, result) => {
  //   callback(err, result);
  // });
  const result = await poolConnection.query(sql, data);
  return result[0];
};

exports.getDataPriceById = async (id) => {
  const sql = `SELECT * FROM price WHERE price_id = ${id}`;
  // mysqlConnection.query(sql, (err, result) => {
  //   callback(err, result);
  // });
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataPriceByIdAndProductId = async (priceId, productId) => {
  const sql = `SELECT * FROM price WHERE price_id = ${priceId} AND product_id = ${productId}`;
  // mysqlConnection.query(sql, (err, result) => {
  //   callback(err, result);
  // });
  const result = await poolConnection.query(sql);
  return result[0];
};

// exports.deleteDataPriceById = (data, callback) => {
//   const sql = `DELETE FROM price WHERE price_id = ${id}`;
//   mysqlConnection.query(sql, (err, result) => {
//     callback(err, result);
//   });
// };

exports.deleteMultipleDataPriceById = async (data) => {
  var sql = "DELETE FROM price WHERE (price_id) IN (?)";
  // mysqlConnection.query(sql, [data], (err, result) => {
  //   callback(err, result);
  // });
  const result = await poolConnection.query(sql, [data]);
  return result[0];
};
