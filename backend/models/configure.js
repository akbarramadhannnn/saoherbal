const poolConnection = require("../connection/mysql2");

exports.getDataConfigureByModuleAndKey = async (module, name) => {
  const sql = `SELECT * FROM configure WHERE module = '${module}' AND name = '${name}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};
