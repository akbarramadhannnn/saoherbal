const express = require("express");
const config = require("./config/env");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
  "/api/v1/product/get-single-image",
  express.static(path.join(__dirname, "assets/images/product"), {
    maxAge: "365d",
  })
);
app.use(
  "/api/v1/product/pdf-invoice",
  express.static(path.join(__dirname, "assets/pdf/product/invoice"), {
    maxAge: "365d",
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));
app.use(routes);

app.listen(config.server.port, (req, res) => {
  console.log(
    `Server running on port ${config.server.host}:${config.server.port}`
  );
});
