const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  server: {
    host: NODE_ENV === "development" ? "http://localhost" : "",
    port: NODE_ENV === "development" ? 2001 : "",
  },
};
