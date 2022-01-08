const router = require("express").Router();
const {
  getProductList,
  addProductList,
  updateProductList,
  deleteProductList,
} = require("../../../controller/product");

router.get("/", getProductList);
router.post("/", addProductList);
router.put("/:id", updateProductList);
router.delete("/:id", deleteProductList);

module.exports = router;
