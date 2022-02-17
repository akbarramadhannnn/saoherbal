const poolConnection = require("../connection/mysql2");

exports.getDataProductAll = async (start, limit, search) => {
  // const sql = `SELECT product.product_id, description, image, product.name AS product_name, category.name AS category_name, variant.name AS variant_name FROM product JOIN category ON product.category_id = category.category_id JOIN variant ON product.variant_id = variant.variant_id`;
  let result;
  if (start || limit || search) {
    sql = `SELECT product.product_id, description, image, product.name AS product_name, JSON_OBJECT('category_id', category.category_id, 'name', category.name) AS category, JSON_OBJECT('variant_id', variant.variant_id, 'name', variant.name) AS variant, JSON_ARRAYAGG(JSON_OBJECT('prices', price.prices, 'unit', price.unit, 'weight', price.weight, 'price_id', price.price_id, 'product_id', price.product_id)) AS price_list FROM product JOIN category ON product.category_id = category.category_id JOIN variant ON product.variant_id = variant.variant_id LEFT JOIN price ON price.product_id = product.product_id WHERE product.name LIKE N? GROUP BY product.product_id LIMIT ${limit} OFFSET ${start}`;
    result = await poolConnection.query(sql, `%${search}%`);
  } else {
    sql = `SELECT product.product_id, description, image, product.name AS product_name, JSON_OBJECT('category_id', category.category_id, 'name', category.name) AS category, JSON_OBJECT('variant_id', variant.variant_id, 'name', variant.name) AS variant, JSON_ARRAYAGG(JSON_OBJECT('prices', price.prices, 'unit', price.unit, 'weight', price.weight, 'price_id', price.price_id, 'product_id', price.product_id)) AS price_list FROM product JOIN category ON product.category_id = category.category_id JOIN variant ON product.variant_id = variant.variant_id LEFT JOIN price ON price.product_id = product.product_id GROUP BY product.product_id`;
    result = await poolConnection.query(sql);
  }
  return result[0];
};

exports.getTotalDataProduct = async (search) => {
  const sql = `SELECT COUNT(*) AS total FROM product WHERE name LIKE N?`;
  const result = await poolConnection.query(sql, `%${search}%`);
  return result[0];
};

exports.addDataProduct = async (
  name,
  category_id,
  variant_id,
  description,
  image
) => {
  const sql = `INSERT INTO product (name, category_id, variant_id, description, image) values ('${name}', '${category_id}', '${variant_id}', '${description}', '${image}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataProductById = async (id) => {
  const sql = `SELECT * FROM product WHERE product_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataProductByNameNotById = async (name, id) => {
  const sql = `SELECT * FROM product WHERE name = '${name}' AND NOT product_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataProductById = async (
  id,
  name,
  category_id,
  variant_id,
  description,
  image
) => {
  let sql = "";
  if (image) {
    sql = `UPDATE product SET name = '${name}', category_id = ${category_id}, variant_id = ${variant_id}, description = '${description}', image = '${image}' WHERE product_id = ${id}`;
  } else {
    sql = `UPDATE product SET name = '${name}', category_id = ${category_id}, variant_id = ${variant_id}, description = '${description}' WHERE product_id = ${id}`;
  }
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.deleteDataProductById = async (id) => {
  const sql = `DELETE FROM product WHERE product_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDetailDataProduct = async (id) => {
  const sql = `SELECT * FROM product WHERE product_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
