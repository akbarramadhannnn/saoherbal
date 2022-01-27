const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
const {
  validationAddDistributor,
  validationUpdateDistributor,
} = require("../../../middleware/validation/distributor");
const {
  getDistributorList,
  addDistributorList,
  updateDistributorList,
  deleteDistributorList,
  detailDistributor,
} = require("../../../controller/distributor");

router.get("/", getToken, getDistributorList);
router.post(
  "/",
  getToken,
  validationAddDistributor,
  RunValidation,
  addDistributorList
);
router.put(
  "/:id",
  getToken,
  validationUpdateDistributor,
  RunValidation,
  updateDistributorList
);
router.delete("/:id", getToken, deleteDistributorList);
router.get("/detail", getToken, detailDistributor);

module.exports = router;
