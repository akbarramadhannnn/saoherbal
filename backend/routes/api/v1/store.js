const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const {
  validationAddStore,
  validationUpdateStore,
} = require("../../../middleware/validation/store");
const {
  getStoreList,
  addStoreList,
  updateStoreList,
  deleteStoreList,
  detailStore,
} = require("../../../controller/store");

router.get("/", getStoreList);
router.post("/", validationAddStore, RunValidation, addStoreList);
router.put("/:id", validationUpdateStore, RunValidation, updateStoreList);
router.delete("/:id", deleteStoreList);
router.get("/detail", detailStore);

module.exports = router;
