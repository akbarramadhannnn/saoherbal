const poolConnection = require("../connection/mysql2");

exports.getDataConfigureByModuleAndKey = async (module, name) => {
  const sql = `SELECT * FROM configure JOIN configure_detail ON configure_detail.configure_id_configure_detail = configure_id WHERE module = '${module}' AND name = '${name}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataConfigureListAll = async () => {
  const sql = `SELECT * FROM configure`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataConfigure = async (module, icon) => {
  const sql = `INSERT INTO configure (module,icon) values ('${module}', '${icon}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataConfigureByModule = async (module) => {
  const sql = `SELECT * FROM configure WHERE module = '${module}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataConfigureDetail = async (id, name, value, description) => {
  const sql = `INSERT INTO configure_detail (configure_id_configure_detail, name, value, description) values (${id}, '${name}', '${value}', '${description}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataConfigureById = async (id) => {
  const sql = `SELECT * FROM configure WHERE configure_id = '${id}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataConfigureDetailAll = async (configureId) => {
  const sql = `SELECT * FROM configure_detail WHERE configure_id_configure_detail = ${configureId}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataConfigureDetailByIdAndConfigureId = async (
  configureDetailId,
  configureId
) => {
  const sql = `SELECT * FROM configure_detail WHERE configure_detail_id = ${configureDetailId} AND configure_id_configure_detail = '${configureId}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataConfigureDetailById = async (id) => {
  const sql = `SELECT * FROM configure_detail WHERE configure_detail_id = '${id}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataConfigureDetail = async (id, name, value, description) => {
  const sql = `UPDATE configure_detail SET name = '${name}', value = '${value}', description = '${description}' WHERE configure_detail_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
