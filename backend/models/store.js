const poolConnection = require("../connection/mysql2");

exports.getDataStoreAll = async (start, limit, search) => {
  let result;
  if (start || limit || search) {
    const sql = `SELECT store.store_id, store.name, email, no_tlp, address, JSON_OBJECT('provinsi_id', provinsi.provinsi_id, 'name', provinsi.name) AS provinsi, JSON_OBJECT('kabupaten_id', kabupaten.kabupaten_id, 'name', kabupaten.name) AS kabupaten FROM store JOIN provinsi ON store.store_prov_id = provinsi.provinsi_id JOIN kabupaten ON store.store_kab_id = kabupaten.kabupaten_id WHERE store.name LIKE N? LIMIT ${limit} OFFSET ${start}`;
    result = await poolConnection.query(sql, `%${search}%`);
  } else {
    const sql = `SELECT store.store_id, store.name, email, no_tlp, address, JSON_OBJECT('provinsi_id', provinsi.provinsi_id, 'name', provinsi.name) AS provinsi, JSON_OBJECT('kabupaten_id', kabupaten.kabupaten_id, 'name', kabupaten.name) AS kabupaten FROM store JOIN provinsi ON store.store_prov_id = provinsi.provinsi_id JOIN kabupaten ON store.store_kab_id = kabupaten.kabupaten_id`;
    result = await poolConnection.query(sql);
  }
  return result[0];
};

exports.getTotalDataStore = async (search) => {
  const sql = `SELECT COUNT(*) AS total FROM store WHERE name LIKE N?`;
  const result = await poolConnection.query(sql, `%${search}%`);
  return result[0];
};

exports.addDataStore = async (
  provinsi_id,
  kabupaten_id,
  name,
  email,
  no_tlp,
  address,
  latitude,
  longitude
) => {
  const sql = `INSERT INTO store (store_prov_id, store_kab_id, name, email, no_tlp, address, latitude, longitude) values ('${provinsi_id}', '${kabupaten_id}', '${name}', '${email}', '${no_tlp}', '${address}', '${latitude}', '${longitude}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataStoreById = async (id) => {
  const sql = `SELECT * FROM store WHERE store_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataStoreByName = async (name) => {
  const sql = `SELECT * FROM store WHERE name = '${name}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataStoreByNameNotById = async (name, id) => {
  const sql = `SELECT * FROM store WHERE name = '${name}' AND NOT store_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataStoreByEmail = async (email) => {
  const sql = `SELECT * FROM store WHERE email = '${email}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataStoreByEmailNotById = async (email, id) => {
  const sql = `SELECT * FROM store WHERE email = '${email}' AND NOT store_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataStoreByNoTlp = async (no_tlp) => {
  const sql = `SELECT * FROM store WHERE no_tlp = '${no_tlp}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataStoreByNoTlpNotById = async (no_tlp, id) => {
  const sql = `SELECT * FROM store WHERE no_tlp = '${no_tlp}' AND NOT store_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataStoreById = async (
  id,
  provinsi_id,
  kabupaten_id,
  name,
  email,
  no_tlp,
  address,
  latitude,
  longitude
) => {
  const sql = `UPDATE store SET store_prov_id = '${provinsi_id}' , store_kab_id = '${kabupaten_id}' , name = '${name}' , email = '${email}' , no_tlp = '${no_tlp}' , address = '${address}', latitude = '${latitude}', longitude = '${longitude}' WHERE store_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.deleteDataStoreById = async (id) => {
  const sql = `DELETE FROM store WHERE store_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDetailDataStore = async (id) => {
  const sql = `SELECT * FROM store WHERE store_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
