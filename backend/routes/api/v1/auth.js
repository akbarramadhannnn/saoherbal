const router = require("express").Router();
const { signIn, getUser } = require("../../../controller/auth");
const { getToken } = require("../../../middleware/auth");

router.get("/", getToken, getUser);
router.post("/signin", signIn);

module.exports = router;
