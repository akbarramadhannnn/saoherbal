const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  api: {
    url_api_v1:
      NODE_ENV === "development"
        ? "http://localhost:2000/api/v1"
        : "https://api-dashboard.saoherbal.com/api/v1",
  },
};
