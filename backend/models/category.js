const mysqlConnection = require("../connection/mysql");

exports.getDataCategoryAll = (callback) => {
  const sql = `SELECT * FROM category`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.addDataCategory = (name, callback) => {
  const sql = `INSERT INTO category (name) values ('${name}')`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataCategoryById = (id, callback) => {
  const sql = `SELECT * FROM category WHERE category_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.updateDataCategoryById = (id, name, callback) => {
  const sql = `UPDATE category SET name = '${name}' WHERE category_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.deleteDataCategoryById = (id, callback) => {
  const sql = `DELETE FROM category WHERE category_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};
