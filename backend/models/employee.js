const poolConnection = require("../connection/mysql2");

exports.getDataEmployeeAll = async () => {
  const sql = `SELECT * FROM employee`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataEmployee = async (name) => {
  const sql = `INSERT INTO employee (name) values ('${name}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataEmployeeByName = async (name) => {
  const sql = `SELECT * FROM employee WHERE name = '${name}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataEmployeeByNameNotById = async (name, id) => {
  const sql = `SELECT * FROM employee WHERE name = '${name}' AND NOT category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataEmployeeById = async (id) => {
  const sql = `SELECT * FROM employee WHERE category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataEmployeeById = async (id, name) => {
  const sql = `UPDATE employee SET name = '${name}' WHERE category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.deleteDataEmployeeById = async (id) => {
  const sql = `DELETE FROM employee WHERE category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDetailDataEmployee = async (id) => {
  const sql = `SELECT * FROM employee WHERE category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
