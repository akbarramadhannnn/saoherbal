const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const {
  validationSignin,
  validationAddAuth,
  validationUpdateAuth,
} = require("../../../middleware/validation/auth");
const {
  signIn,
  getUser,
  addAuth,
  detailAuth,
  updateAuth,
} = require("../../../controller/auth");
const { getToken } = require("../../../middleware/auth");

router.get("/", getToken, getUser);
router.post("/", getToken, validationAddAuth, RunValidation, addAuth);
router.put("/:id", getToken, validationUpdateAuth, RunValidation, updateAuth);
router.get("/detail", getToken, detailAuth);
router.post("/signin", validationSignin, RunValidation, signIn);

module.exports = router;
