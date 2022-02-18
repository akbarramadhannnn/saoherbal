require("./connection/mysql");
const express = require("express");
const config = require("./config/env");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));
app.use(routes);

app.listen(config.server.port, (req, res) => {
  console.log(
    `Server running on port ${config.server.port}`
  );
});
