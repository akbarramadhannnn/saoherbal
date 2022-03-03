const poolConnection = require("../connection/mysql2");

exports.getDataDistributorAll = async (
  start,
  limit,
  search,
  userId,
  position
) => {
  let result;
  if (start || limit || search) {
    let sql;
    if (position === "0" || position === "9") {
      sql = `SELECT distributor.distributor_id, distributor.name, email, no_tlp, address, latitude, longitude, distributor_employee_id, JSON_OBJECT('provinsi_id', provinsi.provinsi_id, 'name', provinsi.name) AS provinsi, JSON_OBJECT('kabupaten_id', kabupaten.kabupaten_id, 'name', kabupaten.name) AS kabupaten FROM distributor JOIN provinsi ON distributor.distributor_prov_id = provinsi.provinsi_id JOIN kabupaten ON distributor.distributor_kab_id = kabupaten.kabupaten_id WHERE distributor.name LIKE N? LIMIT ${limit} OFFSET ${start}`;
    } else {
      sql = `SELECT distributor.distributor_id, distributor.name, email, no_tlp, address, latitude, longitude, distributor_employee_id, JSON_OBJECT('provinsi_id', provinsi.provinsi_id, 'name', provinsi.name) AS provinsi, JSON_OBJECT('kabupaten_id', kabupaten.kabupaten_id, 'name', kabupaten.name) AS kabupaten FROM distributor JOIN provinsi ON distributor.distributor_prov_id = provinsi.provinsi_id JOIN kabupaten ON distributor.distributor_kab_id = kabupaten.kabupaten_id WHERE distributor.name LIKE N? AND distributor_employee_id = ${userId} LIMIT ${limit} OFFSET ${start}`;
    }
    result = await poolConnection.query(sql, `%${search}%`);
  } else {
    let sql;
    if (position === "0" || position === "9") {
      sql = `SELECT distributor.distributor_id, distributor.name, email, no_tlp, address, latitude, longitude, distributor_employee_id, JSON_OBJECT('provinsi_id', provinsi.provinsi_id, 'name', provinsi.name) AS provinsi, JSON_OBJECT('kabupaten_id', kabupaten.kabupaten_id, 'name', kabupaten.name) AS kabupaten FROM distributor JOIN provinsi ON distributor.distributor_prov_id = provinsi.provinsi_id JOIN kabupaten ON distributor.distributor_kab_id = kabupaten.kabupaten_id`;
    } else {
      sql = `SELECT distributor.distributor_id, distributor.name, email, no_tlp, address, latitude, longitude, distributor_employee_id, JSON_OBJECT('provinsi_id', provinsi.provinsi_id, 'name', provinsi.name) AS provinsi, JSON_OBJECT('kabupaten_id', kabupaten.kabupaten_id, 'name', kabupaten.name) AS kabupaten FROM distributor JOIN provinsi ON distributor.distributor_prov_id = provinsi.provinsi_id JOIN kabupaten ON distributor.distributor_kab_id = kabupaten.kabupaten_id WHERE distributor_employee_id = ${userId}`;
    }
    result = await poolConnection.query(sql);
  }
  return result[0];
};

exports.getTotalDataDistributor = async (search, userId, position) => {
  let sql;
  if (position === "0" || position === "9") {
    sql = `SELECT COUNT(*) AS total FROM distributor WHERE name LIKE N?`;
  } else {
    sql = `SELECT COUNT(*) AS total FROM distributor WHERE name LIKE N? AND distributor_employee_id = ${userId}`;
  }
  const result = await poolConnection.query(sql, `%${search}%`);
  return result[0];
};

exports.addDataDistributor = async (
  provinsi_id,
  kabupaten_id,
  userId,
  name,
  email,
  no_tlp,
  address,
  latitude,
  longitude
) => {
  const sql = `INSERT INTO distributor (distributor_prov_id, distributor_kab_id, distributor_employee_id, name, email, no_tlp, address, latitude, longitude) values ('${provinsi_id}', '${kabupaten_id}', '${userId}', '${name}', '${email}', '${no_tlp}', '${address}', '${latitude}', '${longitude}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDistributorById = async (id) => {
  const sql = `SELECT * FROM distributor WHERE distributor_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDistributorByName = async (name) => {
  const sql = `SELECT * FROM distributor WHERE name = '${name}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDistributorByNameNotById = async (name, id) => {
  const sql = `SELECT * FROM distributor WHERE name = '${name}' AND NOT distributor_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDistributorByEmail = async (email) => {
  const sql = `SELECT * FROM distributor WHERE email = '${email}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDistributorByEmailNotById = async (email, id) => {
  const sql = `SELECT * FROM distributor WHERE email = '${email}' AND NOT distributor_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDistributorByNoTlp = async (no_tlp) => {
  const sql = `SELECT * FROM distributor WHERE no_tlp = '${no_tlp}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataDistributorByNoTlpNotById = async (no_tlp, id) => {
  const sql = `SELECT * FROM distributor WHERE no_tlp = '${no_tlp}' AND NOT distributor_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataDistributorById = async (
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
  const sql = `UPDATE distributor SET distributor_prov_id = '${provinsi_id}' , distributor_kab_id = '${kabupaten_id}' , name = '${name}' , email = '${email}' , no_tlp = '${no_tlp}' , address = '${address}', latitude = '${latitude}', longitude = '${longitude}' WHERE distributor_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.deleteDataDistributorById = async (id) => {
  const sql = `DELETE FROM distributor WHERE distributor_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDetailDataDistributor = async (id) => {
  const sql = `SELECT * FROM distributor WHERE distributor_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
