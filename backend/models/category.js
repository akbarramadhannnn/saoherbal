const poolConnection = require("../connection/mysql2");

exports.getDataCategoryAll = async (start, limit, search) => {
  const sql = `SELECT * FROM category WHERE name LIKE N? LIMIT ${limit} OFFSET ${start}`;
  const result = await poolConnection.query(sql, `%${search}%`);
  return result[0];
};

exports.getTotalDataCategory = async (search) => {
  const sql = `SELECT COUNT(*) AS total FROM category WHERE name LIKE N?`;
  const result = await poolConnection.query(sql, `%${search}%`);
  return result[0];
};

exports.addDataCategory = async (name) => {
  const sql = `INSERT INTO category (name) values ('${name}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataCategoryByName = async (name) => {
  const sql = `SELECT * FROM category WHERE name = '${name}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataCategoryByNameNotById = async (name, id) => {
  const sql = `SELECT * FROM category WHERE name = '${name}' AND NOT category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataCategoryById = async (id) => {
  const sql = `SELECT * FROM category WHERE category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataCategoryById = async (id, name) => {
  const sql = `UPDATE category SET name = '${name}' WHERE category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.deleteDataCategoryById = async (id) => {
  const sql = `DELETE FROM category WHERE category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDetailDataCategory = async (id) => {
  const sql = `SELECT * FROM category WHERE category_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
