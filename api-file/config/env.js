const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  server: {
    port: NODE_ENV === "development" || NODE_ENV === "local" ? 2001 : 4001,
  },
};
