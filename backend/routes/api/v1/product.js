const router = require("express").Router();
const {
  getProductList,
  addProductList,
  updateProductList,
  deleteProductList,
  detailProduct
} = require("../../../controller/product");

router.get("/", getProductList);
router.post("/", addProductList);
router.put("/:id", updateProductList);
router.delete("/:id", deleteProductList);
router.get("/detail", detailProduct);

module.exports = router;
