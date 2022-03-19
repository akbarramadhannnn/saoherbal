const router = require("express").Router();
const category = require("./category");
const variant = require("./variant");
const product = require("./product");
const auth = require("./auth");
const wilayah = require("./wilayah");
const store = require("./store");
const distributor = require("./distributor");
const transaction = require("./transaction");
const bill = require("./bill");
const employee = require("./employee");
const configure = require("./configure");
const prodcutioncost = require("./productioncost");
const operasionalcost = require("./operasionalcost");
const Response = require("../../../helpers/response");

router.get("/", (req, res) => {
  return res.json(Response(true, 200, `root api`, {}));
});
router.use("/category", category);
router.use("/variant", variant);
router.use("/product", product);
router.use("/auth", auth);
router.use("/wilayah", wilayah);
router.use("/store", store);
router.use("/distributor", distributor);
router.use("/transaction", transaction);
router.use("/bill", bill);
router.use("/employee", employee);
router.use("/configure", configure);
router.use("/production-cost", prodcutioncost);
router.use("/operasional-cost", operasionalcost);

module.exports = router;
