const mysql2 = require("mysql2/promise");
const config = require("../config/env");

const pool = mysql2.createPool({
  host: config.database_sql.host,
  user: config.database_sql.user,
  password: config.database_sql.password,
  database: config.database_sql.database, 
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Database connected successfully");
  connection.release();
});

module.exports = pool;
