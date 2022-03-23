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
  "/api/v1/transaction/invoice-transaction",
  express.static(path.join(__dirname, "assets/pdf/transaction/invoice-transaction"), {
    maxAge: "365d",
  })
);
app.use(
  "/api/v1/transaction/invoice-titip",
  express.static(path.join(__dirname, "assets/pdf/transaction/invoice-titip"), {
    maxAge: "365d",
  })
);
// app.use(
//   "/api/v1/transaction/invoice-tempo",
//   // express.static(path.join(__dirname, "assets/pdf/transaction/invoice-tempo"), {
//   //   setHeaders: (res, filepath) =>
//   //     res.attachment(`pdf-express-${path.basename(filepath)}`),
//   // })
//   express.static(path.join(__dirname, "assets/pdf/transaction/invoice-tempo"), {
//     maxAge: "365d",
//   })
// );
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("combined"));
app.use(routes);

app.listen(config.server.port, (req, res) => {
  console.log(`Server running on port ${config.server.port}`);
});
