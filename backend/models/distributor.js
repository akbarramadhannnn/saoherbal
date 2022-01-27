const poolConnection = require("../connection/mysql2");

exports.getDataDistributorAll = async () => {
  const sql = `SELECT distributor.distributor_id, distributor.name, email, no_tlp, address, JSON_OBJECT('provinsi_id', provinsi.provinsi_id, 'name', provinsi.name) AS provinsi, JSON_OBJECT('kabupaten_id', kabupaten.kabupaten_id, 'name', kabupaten.name) AS kabupaten FROM distributor JOIN provinsi ON distributor.distributor_prov_id = provinsi.provinsi_id JOIN kabupaten ON distributor.distributor_kab_id = kabupaten.kabupaten_id`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataDistributor = async (
  provinsi_id,
  kabupaten_id,
  name,
  email,
  no_tlp,
  address
) => {
  const sql = `INSERT INTO distributor (distributor_prov_id, distributor_kab_id, name, email, no_tlp, address) values ('${provinsi_id}', '${kabupaten_id}', '${name}', '${email}', '${no_tlp}', '${address}')`;
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
  address
) => {
  const sql = `UPDATE distributor SET distributor_prov_id = '${provinsi_id}' , distributor_kab_id = '${kabupaten_id}' , name = '${name}' , email = '${email}' , no_tlp = '${no_tlp}' , address = '${address}' WHERE distributor_id = ${id}`;
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
