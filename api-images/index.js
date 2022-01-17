const express = require("express");
const config = require("./config/env.json");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const app = express();
app.use(cors());
app.use(
  "/api/v1/product/get-single-image",
  express.static(path.join(__dirname, "assets/images/product"), {
    maxAge: "365d",
  })
);
app.use(routes);

app.listen(config.server.port, (req, res) => {
  console.log(`Server running on port ${config.server.port}`);
});
