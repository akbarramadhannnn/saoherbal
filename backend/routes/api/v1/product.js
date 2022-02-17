const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
const {
  validationAddProduct,
  validationUpdateProduct,
} = require("../../../middleware/validation/product");
const {
  getProductList,
  getProductListAll,
  addProductList,
  updateProductList,
  deleteProductList,
  detailProduct,
} = require("../../../controller/product");

router.get("/", getToken, getProductList);
router.post("/", getToken, validationAddProduct, RunValidation, addProductList);
router.get("/all", getToken, getProductListAll);
router.put(
  "/:id",
  getToken,
  validationUpdateProduct,
  RunValidation,
  updateProductList
);
router.delete("/:id", getToken, deleteProductList);
router.get("/detail", getToken, detailProduct);

module.exports = router;
