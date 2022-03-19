const poolConnection = require("../connection/mysql2");

exports.getDataProductionCostList = async (start, limit) => {
  var sql = `SELECT * FROM production_cost LIMIT ${limit} OFFSET ${start}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getTotalDataProductionCost = async () => {
  const sql = `SELECT COUNT(*) AS total FROM production_cost`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataProductionCostById = async (id) => {
  var sql = `SELECT * FROM production_cost WHERE production_cost_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataProductionCostByDate = async (date) => {
  var sql = `SELECT * FROM production_cost WHERE DATE(created_at) = '${date}'`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addDataProductionCost = async (subTotal) => {
  var sql = `INSERT INTO production_cost (sub_total) VALUES (${subTotal})`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataProductionCost = async (id, subTotal) => {
  var sql = `UPDATE production_cost SET sub_total = ${subTotal} WHERE production_cost_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.addMultipleDataProductionCostDetail = async (data) => {
  var sql = `INSERT INTO production_cost_detail (id_production_cost, item_name, price, qty, unit, total) VALUES ?`;
  const result = await poolConnection.query(sql, [data]);
  return result[0];
};

exports.updateMultipleDataProductionCostDetail = async (data) => {
  var sql =
    "UPDATE production_cost_detail SET item_name = ? , price = ? , qty = ?, unit = ?, total = ? WHERE production_cost_detail_id = ?";
  const result = await poolConnection.query(sql, data);
  return result[0];
};

exports.getDataProductionCostDetailByProductionCostId = async (id) => {
  var sql = `SELECT * FROM production_cost_detail WHERE id_production_cost = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.getDataProductionCostDetailById = async (id) => {
  var sql = `SELECT * FROM production_cost_detail WHERE production_cost_detail_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};
