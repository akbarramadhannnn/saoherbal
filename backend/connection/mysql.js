const mysql = require("mysql");
const config = require("../config/env");

const mysqlConnection = mysql.createConnection({
  host: config.database_sql.host,
  user: config.database_sql.user,
  password: config.database_sql.password,
  database: config.database_sql.database,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("Database is connected!");
  else
    console.log(
      "Database not connected! : " + JSON.stringify(err, undefined, 2)
    );
});

module.exports = mysqlConnection;
