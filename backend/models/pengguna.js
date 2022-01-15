const mysqlConnection = require("../connection/mysql");

// exports.getDataCategoryAll = (callback) => {
//   const sql = `SELECT * FROM category`;
//   mysqlConnection.query(sql, (err, result) => {
//     callback(err, result);
//   });
// };

exports.addDataPengguna = (name, username, password, role, callback) => {
  const sql = `INSERT INTO pengguna (name,username,password,role) values ('${name}','${username}','${password}','${role}')`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataPenggunaByUsername = (username, callback) => {
  const sql = `SELECT * FROM pengguna WHERE username = '${username}'`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataPenggunaById = (id, callback) => {
  const sql = `SELECT pengguna_id, name, username, role FROM pengguna WHERE pengguna_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
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
