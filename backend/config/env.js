const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  server: {
    port: NODE_ENV === "development" || NODE_ENV === "local" ? 2000 : 4000,
  },
  database_sql: {
    host: NODE_ENV === "local" ? "localhost" : "185.210.144.158",
    port: NODE_ENV === "local" ? 3306 : 3306,
    user: NODE_ENV === "local" ? "root" : "pitik",
    password: NODE_ENV === "local" ? "123pitik" : "123pitik",
    database:
      NODE_ENV === "development" || NODE_ENV === "local"
        ? "dev_saoherbal"
        : "prod_saoherbal",
  },
  api_image: {
    url_api_v1:
      NODE_ENV === "local"
        ? "http://localhost:2001/api/v1"
        : NODE_ENV === "development"
        ? "http://185.210.144.158:2001/api/v1"
        : "http://185.210.144.158:4001/api/v1",
  },
};
