const poolConnection = require("../connection/mysql2");

exports.getDataOperasionalCostList = async (start, limit) => {
  var sql = `SELECT * FROM operasional_cost LIMIT ${limit} OFFSET ${start}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getTotalDataOperasionalCost = async () => {
  const sql = `SELECT COUNT(*) AS total FROM operasional_cost`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataOperasionalCostById = async (id) => {
  var sql = `SELECT * FROM operasional_cost WHERE operasional_cost_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataOperasionalCostByDate = async (date) => {
  var sql = `SELECT * FROM operasional_cost WHERE DATE(created_at) = '${date}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataOperasionalCost = async (subTotal) => {
  var sql = `INSERT INTO operasional_cost (sub_total) VALUES (${subTotal})`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataOperasionalCost = async (id, subTotal) => {
  var sql = `UPDATE operasional_cost SET sub_total = ${subTotal} WHERE operasional_cost_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addMultipleDataOperasionalCostDetail = async (data) => {
  var sql = `INSERT INTO operasional_cost_detail (id_operasional_cost, item_name, price, qty, unit, total) VALUES ?`;
  const result = await poolConnection.query(sql, [data]);
  return result[0];
};

exports.updateMultipleDataOperasionalCostDetail = async (data) => {
  var sql =
    "UPDATE operasional_cost_detail SET item_name = ? , price = ? , qty = ?, unit = ?, total = ? WHERE operasional_cost_detail_id = ?";
  const result = await poolConnection.query(sql, data);
  return result[0];
};

exports.getDataOperasionalCostDetailByOperasionalCostId = async (id) => {
  var sql = `SELECT * FROM operasional_cost_detail WHERE id_operasional_cost = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataOperasionalCostDetailById = async (id) => {
  var sql = `SELECT * FROM operasional_cost_detail WHERE operasional_cost_detail_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
