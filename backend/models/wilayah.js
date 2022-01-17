const mysqlConnection = require("../connection/mysql");

// exports.addMultipleDataProvinsi = (data, callback) => {
//   var sql = "INSERT INTO kabupaten (provinsi_id, name) VALUES ?";
//   mysqlConnection.query(sql, [data], (err, result) => {
//     callback(err, result);
//   });
// };

exports.getDataProvinsi = (callback) => {
  var sql = `SELECT * FROM provinsi`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataKabupatenByProvinsiId = (id, callback) => {
  var sql = `SELECT * FROM kabupaten WHERE provinsi_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataProvinsiById = (id, callback) => {
  var sql = `SELECT * FROM provinsi WHERE provinsi_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataKabupatenById = (id, callback) => {
  var sql = `SELECT * FROM kabupaten WHERE kabupaten_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataKabupatenAndProvinsiById = (
  kabupaten_id,
  provinsi_id,
  callback
) => {
  var sql = `SELECT * FROM kabupaten WHERE kabupaten_id = ${kabupaten_id} AND provinsi_id = ${provinsi_id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};
