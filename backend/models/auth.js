const poolConnection = require("../connection/mysql2");

exports.addDataAuth = async (
  employeeId,
  username,
  passwordHash,
  passwordOri
) => {
  const sql = `INSERT INTO auth (employee_id_auth, username, password_hash, password_ori) values (${employeeId}, '${username}', '${passwordHash}', '${passwordOri}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataAuthByUsername = async (username) => {
  const sql = `SELECT * FROM auth WHERE username = '${username}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataAuthByEmployeeId = async (id) => {
  const sql = `SELECT * FROM auth WHERE employee_id_auth = '${id}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataAuthByAuthId = async (id) => {
  const sql = `SELECT * FROM auth WHERE auth_id = '${id}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataAuthByUsernameNotById = async (id, username) => {
  const sql = `SELECT * FROM auth WHERE username = '${username}' AND NOT auth_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataAuth = async (
  idAuth,
  username,
  passwordHash,
  passwordOri
) => {
  const sql = `UPDATE auth SET username = '${username}', password_hash = '${passwordHash}', password_ori = ${passwordOri} WHERE auth_id = ${idAuth}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
