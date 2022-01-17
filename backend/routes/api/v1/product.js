const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const {
  validationAddProduct,
  validationUpdateProduct,
} = require("../../../middleware/validation/product");
const {
  getProductList,
  addProductList,
  updateProductList,
  deleteProductList,
  detailProduct,
} = require("../../../controller/product");

router.get("/", getProductList);
router.post("/", validationAddProduct, RunValidation, addProductList);
router.put("/:id", validationUpdateProduct, RunValidation, updateProductList);
router.delete("/:id", deleteProductList);
router.get("/detail", detailProduct);

module.exports = router;
