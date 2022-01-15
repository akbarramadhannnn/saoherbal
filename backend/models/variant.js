const mysqlConnection = require("../connection/mysql");

exports.getDataVariantAll = (callback) => {
  const sql = `SELECT * FROM variant`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.addDataVariant = (name, callback) => {
  const sql = `INSERT INTO variant (name) values ('${name}')`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataVariantById = (id, callback) => {
  const sql = `SELECT * FROM variant WHERE variant_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.updateDataVariantById = (id, name, callback) => {
  const sql = `UPDATE variant SET name = '${name}' WHERE variant_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.deleteDataVariantById = (id, callback) => {
  const sql = `DELETE FROM variant WHERE variant_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDetailDataVariant = (id, callback) => {
  const sql = `SELECT * FROM variant WHERE variant_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};
