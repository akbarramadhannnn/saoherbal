const poolConnection = require("../connection/mysql2");

exports.getDataVariantAll = async (categoryId) => {
  let sql = "";
  if (categoryId) {
    sql = `SELECT variant.variant_id, variant.name, JSON_OBJECT('category_id', category.category_id, 'name', category.name) AS category FROM variant JOIN category ON variant.variant_category_id = category.category_id WHERE variant_category_id = ${categoryId}`;
  } else {
    sql = `SELECT variant.variant_id, variant.name, JSON_OBJECT('category_id', category.category_id, 'name', category.name) AS category FROM variant JOIN category ON variant.variant_category_id = category.category_id`;
  }
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataVariant = async (category_id, name) => {
  const sql = `INSERT INTO variant (variant_category_id, name) values ('${category_id}', '${name}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataVariantByName = async (name) => {
  const sql = `SELECT * FROM variant WHERE name = '${name}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataVariantByNameNotById = async (name, id) => {
  const sql = `SELECT * FROM variant WHERE name = '${name}' AND NOT variant_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataVariantById = async (id) => {
  const sql = `SELECT * FROM variant WHERE variant_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataVariantById = async (id, category_id, name) => {
  const sql = `UPDATE variant SET variant_category_id = ${category_id}, name = '${name}' WHERE variant_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.deleteDataVariantById = async (id) => {
  const sql = `DELETE FROM variant WHERE variant_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDetailDataVariant = async (id) => {
  const sql = `SELECT * FROM variant WHERE variant_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataMatchCategoryAndVariantById = async (
  variant_id,
  category_id
) => {
  const sql = `SELECT * FROM variant WHERE variant_id = ${variant_id} AND variant_category_id = ${category_id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
