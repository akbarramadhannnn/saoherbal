const router = require("express").Router();
const { getProvinsi, getKabupaten } = require("../../../controller/wilayah");

router.get("/provinsi", getProvinsi);
router.get("/kabupaten", getKabupaten);
// router.post("/", addProvinsi);
// router.put("/:id", updateCategoryList);
// router.delete("/:id", deleteCategoryList);
// router.get("/detail", detailCategory);

module.exports = router;
