const mysqlConnection = require("../connection/mysql");

exports.addMultipleDataPrice = (data, callback) => {
  var sql = "INSERT INTO price (product_id, weight, price, unit) VALUES ?";
  mysqlConnection.query(sql, [data], (err, result) => {
    callback(err, result);
  });
};
