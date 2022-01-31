const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  server: {
    port: NODE_ENV === "development" ? 2000 : "",
  },
  database_sql: {
    host: NODE_ENV === "development" ? "localhost" : "",
    port: NODE_ENV === "development" ? 3306 : "",
    user: NODE_ENV === "development" ? "root" : "",
    password: NODE_ENV === "development" ? "123pitik" : "",
    database: NODE_ENV === "development" ? "dev_saoherbal" : "",
  },
  api_image: {
    url_api_v1:
      NODE_ENV === "development" ? "http://localhost:2001/api/v1" : "",
  },
};
