const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  server: {
    port: NODE_ENV === "development" ? 2001 : 2003,
  },
};
