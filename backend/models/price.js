const mysqlConnection = require("../connection/mysql");

exports.addMultipleDataPrice = (data, callback) => {
  var sql = "INSERT INTO price (product_id, weight, price, unit) VALUES ?";
  mysqlConnection.query(sql, [data], (err, result) => {
    callback(err, result);
  });
};

exports.getPriceByProductId = (id, callback) => {
  const sql = `SELECT * FROM price WHERE product_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.updateMultipleDataPrice = (data, callback) => {
  var sql =
    "UPDATE price SET weight = ? , price = ? , unit = ? WHERE price_id = ?";
  mysqlConnection.query(sql, data, (err, result) => {
    callback(err, result);
  });
};

exports.getDataPriceById = (id, callback) => {
  const sql = `SELECT * FROM price WHERE price_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.deleteDataPriceById = (data, callback) => {
  const sql = `DELETE FROM price WHERE price_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.deleteMultipleDataPriceById = (data, callback) => {
  var sql = "DELETE FROM price WHERE (price_id) IN (?)";
  mysqlConnection.query(sql, [data], (err, result) => {
    callback(err, result);
  });
};
