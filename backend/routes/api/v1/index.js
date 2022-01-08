const router = require("express").Router();
const category = require("./category");
const variant = require("./variant");
const product = require("./product");

router.use("/category", category);
router.use("/variant", variant);
router.use("/product", product);

module.exports = router;
