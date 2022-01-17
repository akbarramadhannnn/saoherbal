const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { validationSignin } = require("../../../middleware/validation/auth");
const { signIn, getUser } = require("../../../controller/auth");
const { getToken } = require("../../../middleware/auth");

router.get("/", getToken, getUser);
router.post("/signin", validationSignin, RunValidation, signIn);

module.exports = router;
