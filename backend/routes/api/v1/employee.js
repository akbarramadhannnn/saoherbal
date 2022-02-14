const router = require("express").Router();
const RunValidation = require("../../../middleware/validation/runValidation");
const { getToken } = require("../../../middleware/auth");
const {
  validationAddEmployee,
  validationUpdateEmployee,
  validationUpdateActiveEmployee,
} = require("../../../middleware/validation/emloyee");
const {
  getEmployeeList,
  addEmployeeList,
  updateEmployeeList,
  deleteEmployeeList,
  detailEmployee,
  updateActive,
} = require("../../../controller/employee");

router.get("/", getToken, getEmployeeList);
router.post(
  "/",
  getToken,
  validationAddEmployee,
  RunValidation,
  addEmployeeList
);
router.put(
  "/update-active/:id",
  getToken,
  validationUpdateActiveEmployee,
  RunValidation,
  updateActive
);
router.put(
  "/:id",
  getToken,
  validationUpdateEmployee,
  RunValidation,
  updateEmployeeList
);
router.delete("/:id", getToken, deleteEmployeeList);
router.get("/detail", getToken, detailEmployee);

module.exports = router;
