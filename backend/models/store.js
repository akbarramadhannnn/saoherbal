const mysqlConnection = require("../connection/mysql");

exports.getDataStoreAll = (callback) => {
  const sql = `SELECT * FROM store`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.addDataStore = (
  provinsi_id,
  kabupaten_id,
  name,
  email,
  no_tlp,
  address,
  callback
) => {
  const sql = `INSERT INTO store (store_prov_id, store_kab_id, name, email, no_tlp, address) values ('${provinsi_id}', '${kabupaten_id}', '${name}', '${email}', '${no_tlp}', '${address}')`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataStoreById = (id, callback) => {
  const sql = `SELECT * FROM store WHERE store_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataStoreByName = (name, callback) => {
  const sql = `SELECT * FROM store WHERE name = '${name}'`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataStoreByNameNotById = (name, id, callback) => {
  const sql = `SELECT * FROM store WHERE name = '${name}' AND NOT store_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataStoreByEmail = (email, callback) => {
  const sql = `SELECT * FROM store WHERE email = '${email}'`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataStoreByEmailNotById = (email, id, callback) => {
  const sql = `SELECT * FROM store WHERE email = '${email}' AND NOT store_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataStoreByNoTlp = (no_tlp, callback) => {
  const sql = `SELECT * FROM store WHERE no_tlp = '${no_tlp}'`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataStoreByNoTlpNotById = (no_tlp, id, callback) => {
  const sql = `SELECT * FROM store WHERE no_tlp = '${no_tlp}' AND NOT store_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.updateDataStoreById = (
  id,
  provinsi_id,
  kabupaten_id,
  name,
  email,
  no_tlp,
  address,
  callback
) => {
  const sql = `UPDATE store SET store_prov_id = '${provinsi_id}' , store_kab_id = '${kabupaten_id}' , name = '${name}' , email = '${email}' , no_tlp = '${no_tlp}' , address = '${address}' WHERE store_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.deleteDataStoreById = (id, callback) => {
  const sql = `DELETE FROM store WHERE store_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDetailDataStore = (id, callback) => {
  const sql = `SELECT * FROM store WHERE store_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};
