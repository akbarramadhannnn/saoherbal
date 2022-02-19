const poolConnection = require("../connection/mysql2");

exports.getDataEmployeeAll = async (start, limit, search) => {
  let result;
  if (start || limit || search) {
    const sql = `SELECT * FROM employee WHERE position != '0' AND position != '9' AND name LIKE N? LIMIT ${limit} OFFSET ${start}`;
    result = await poolConnection.query(sql, `%${search}%`);
  } else {
    const sql = `SELECT * FROM employee WHERE position != '0' AND position != '9'`;
    result = await poolConnection.query(sql);
  }
  return result[0];
};

exports.getTotalDataEmployee = async (search) => {
  const sql = `SELECT COUNT(*) AS total FROM employee WHERE position != '0' AND position != '9' AND name LIKE N?`;
  const result = await poolConnection.query(sql, `%${search}%`);
  return result[0];
};

exports.addDataEmployee = async (
  nik,
  typeId,
  numberId,
  name,
  email,
  gender,
  placeOfDate,
  birthOfDate,
  position,
  noTlp,
  provinsiId,
  kabupatenId,
  address,
  joinDate
) => {
  const sql = `INSERT INTO employee (nik, type_id, number_id, name, gender, email, place_of_birth, birth_of_date, position, no_tlp, provinsi_id_employee, kabupaten_id_employee, address, join_date) values ('${nik}', '${typeId}', '${numberId}', '${name}', '${gender}', '${email}', '${placeOfDate}', '${birthOfDate}', '${position}', ${noTlp}, ${provinsiId}, ${kabupatenId}, '${address}', '${joinDate}')`;
  const result = await poolConnection.query(sql);
  return result[0];
};

// exports.getDataEmployeeByName = async (name) => {
//   const sql = `SELECT * FROM employee WHERE name = '${name}'`;
//   const result = await poolConnection.query(sql);
//   return result[0];
// };

// exports.getDataEmployeeByNameNotById = async (name, id) => {
//   const sql = `SELECT * FROM employee WHERE name = '${name}' AND NOT category_id = ${id}`;
//   const result = await poolConnection.query(sql);
//   return result[0];
// };

exports.getDataEmployeeById = async (id) => {
  const sql = `SELECT * FROM employee WHERE employee_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataActiveEmployeeById = async (id, active) => {
  const sql = `UPDATE employee SET active = '${active}' WHERE employee_id = ${id}`;
  const result = await poolConnection.query(sql);
  return result[0];
};

exports.updateDataEmployee = async (
  id,
  typeId,
  numberId,
  name,
  email,
  gender,
  placeOfDate,
  birthOfDate,
  position,
  noTlp,
  provinsiId,
  kabupatenId,
  address,
  joinDate,
  updateAt
) => {
  const sql = `UPDATE employee SET type_id = '${typeId}', number_id = '${numberId}', name = '${name}', gender = '${gender}', email = '${email}', place_of_birth = '${placeOfDate}', birth_of_date = '${birthOfDate}', position = '${position}', no_tlp = ${noTlp}, provinsi_id_employee = ${provinsiId}, kabupaten_id_employee = ${kabupatenId}, address = '${address}', join_date = '${joinDate}', update_at = '${updateAt}' WHERE employee_id = ${id} `;
  const result = await poolConnection.query(sql);
  return result[0];
};

// exports.deleteDataEmployeeById = async (id) => {
//   const sql = `DELETE FROM employee WHERE category_id = ${id}`;
//   const result = await poolConnection.query(sql);
//   return result[0];
// };

// exports.getDetailDataEmployee = async (id) => {
//   const sql = `SELECT * FROM employee WHERE category_id = ${id}`;
//   const result = await poolConnection.query(sql);
//   return result[0];
// };
