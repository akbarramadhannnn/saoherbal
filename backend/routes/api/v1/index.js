const router = require("express").Router();
const category = require("./category");
const variant = require("./variant");
const product = require("./product");
const pengguna = require("./pengguna");
const auth = require("./auth");
const wilayah = require('./wilayah');
const store = require('./store');
const distributor = require('./distributor');
const transaction = require('./transaction');
const bill = require('./bill');

router.use("/category", category);
router.use("/variant", variant);
router.use("/product", product);
router.use("/pengguna", pengguna);
router.use("/auth", auth);
router.use("/wilayah", wilayah);
router.use("/store", store);
router.use("/distributor", distributor);
router.use("/transaction", transaction);
router.use("/bill", bill);

module.exports = router;
