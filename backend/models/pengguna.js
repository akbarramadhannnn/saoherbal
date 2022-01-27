const poolConnection = require("../connection/mysql2");

// exports.getDataCategoryAll = (callback) => {
//   const sql = `SELECT * FROM category`;
//   mysqlConnection.query(sql, (err, result) => {
//     callback(err, result);
//   });
// };

exports.addDataPengguna = async (name, username, password, role) => {
  const sql = `INSERT INTO pengguna (name,username,password,role) values ('${name}','${username}','${password}','${role}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataPenggunaByUsername = async (username) => {
  const sql = `SELECT * FROM pengguna WHERE username = '${username}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataPenggunaById = async (id) => {
  const sql = `SELECT pengguna_id, name, username, role FROM pengguna WHERE pengguna_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

// exports.updateDataCategoryById = (id, name, callback) => {
//   const sql = `UPDATE category SET name = '${name}' WHERE category_id = ${id}`;
//   mysqlConnection.query(sql, (err, result) => {
//     callback(err, result);
//   });
// };

// exports.deleteDataCategoryById = (id, callback) => {
//   const sql = `DELETE FROM category WHERE category_id = ${id}`;
//   mysqlConnection.query(sql, (err, result) => {
//     callback(err, result);
//   });
// };

// exports.getDetailDataCategory = (id, callback) => {
//   const sql = `SELECT * FROM category WHERE category_id = ${id}`;
//   mysqlConnection.query(sql, (err, result) => {
//     callback(err, result);
//   });
// };
