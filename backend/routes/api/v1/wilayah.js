const router = require("express").Router();
const { getProvinsi, getKabupaten } = require("../../../controller/wilayah");
const { getToken } = require("../../../middleware/auth");

router.get("/provinsi", getToken, getProvinsi);
router.get("/kabupaten", getToken, getKabupaten);
// router.post("/", addProvinsi);
// router.put("/:id", updateCategoryList);
// router.delete("/:id", deleteCategoryList);
// router.get("/detail", detailCategory);

module.exports = router;
