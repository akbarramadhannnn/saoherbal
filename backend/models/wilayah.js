const poolConnection = require("../connection/mysql2");

// exports.addMultipleDataProvinsi = (data, callback) => {
//   var sql = "INSERT INTO kabupaten (provinsi_id, name) VALUES ?";
//   mysqlConnection.query(sql, [data], (err, result) => {
//     callback(err, result);
//   });
// };

exports.getDataProvinsi = async () => {
  var sql = `SELECT * FROM provinsi`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataKabupatenByProvinsiId = async (id) => {
  var sql = `SELECT * FROM kabupaten WHERE provinsi_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataProvinsiById = async (id) => {
  var sql = `SELECT * FROM provinsi WHERE provinsi_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataKabupatenById = async (id) => {
  var sql = `SELECT * FROM kabupaten WHERE kabupaten_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataKabupatenAndProvinsiById = async (kabupaten_id, provinsi_id) => {
  var sql = `SELECT * FROM kabupaten WHERE kabupaten_id = ${kabupaten_id} AND provinsi_id = ${provinsi_id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
