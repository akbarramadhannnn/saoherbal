const mysqlConnection = require("../connection/mysql");

exports.getDataProductAll = (callback) => {
  const sql = `SELECT product_id, description, image, product.name AS product_name, category.name AS category_name, variant.name AS variant_name FROM product JOIN category ON product.category_id = category.category_id JOIN variant ON product.variant_id = variant.variant_id`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.addDataProduct = (
  name,
  category_id,
  variant_id,
  description,
  image,
  callback
) => {
  const sql = `INSERT INTO product (name, category_id, variant_id, description, image) values ('${name}', '${category_id}', '${variant_id}', '${description}', '${image}')`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDataProductById = (id, callback) => {
  const sql = `SELECT * FROM product WHERE product_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.updateDataProductById = (
  id,
  name,
  category_id,
  variant_id,
  description,
  image,
  callback
) => {
  let sql = "";
  if (image) {
    sql = `UPDATE product SET name = '${name}', category_id = ${category_id}, variant_id = ${variant_id}, description = '${description}', image = '${image}' WHERE product_id = ${id}`;
  } else {
    sql = `UPDATE product SET name = '${name}', category_id = ${category_id}, variant_id = ${variant_id}, description = '${description}' WHERE product_id = ${id}`;
  }
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.deleteDataProductById = (id, callback) => {
  const sql = `DELETE FROM product WHERE product_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};

exports.getDetailDataProduct = (id, callback) => {
  const sql = `SELECT * FROM product WHERE product_id = ${id}`;
  mysqlConnection.query(sql, (err, result) => {
    callback(err, result);
  });
};
