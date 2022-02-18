const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  server: {
    host: NODE_ENV === "development" ? "http://localhost" : "185.210.144.158",
    port: NODE_ENV === "development" ? 2001 : 2003,
  },
};
