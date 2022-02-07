const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
// const {
//   validationAddCategory,
//   validationUpdateCategory,
// } = require("../../../middleware/validation/category");
const {
  getEmployeeList,
  addEmployeeList,
  updateEmployeeList,
  deleteEmployeeList,
  detailEmployee,
} = require("../../../controller/employee");

router.get("/", getToken, getEmployeeList);
router.post(
  "/",
  getToken,
  //   validationAddCategory,
  //   RunValidation,
  addEmployeeList
);
router.put(
  "/:id",
  getToken,
  //   validationUpdateCategory,
  //   RunValidation,
  updateEmployeeList
);
router.delete("/:id", getToken, deleteEmployeeList);
router.get("/detail", getToken, detailEmployee);

module.exports = router;
