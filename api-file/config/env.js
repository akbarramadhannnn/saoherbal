const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  server: {
    port: NODE_ENV === "development" || NODE_ENV === "local" ? 2001 : 4001,
    host:
      NODE_ENV === "local"
        ? "http://localhost"
        : NODE_ENV === "development"
        ? "http://185.210.144.158"
        : "https://api-dashboard.saoherbal.com/file",
  },
};
