const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
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

router.get("/", getToken, getStoreList);
router.post("/", getToken, validationAddStore, RunValidation, addStoreList);
router.put(
  "/:id",
  getToken,
  validationUpdateStore,
  RunValidation,
  updateStoreList
);
router.delete("/:id", getToken, deleteStoreList);
router.get("/detail", getToken, detailStore);

module.exports = router;
