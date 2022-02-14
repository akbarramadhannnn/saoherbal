const bcryptjs = require("bcryptjs");
const {
  getDataAuthByUsername,
  addDataAuth,
  getDataAuthByEmployeeId,
  getDataAuthByAuthId,
  getDataAuthByUsernameNotById,
  updateDataAuth,
} = require("../models/auth");
const { getDataEmployeeById } = require("../models/employee");
const Response = require("../helpers/response");
const { signJWT } = require("../middleware/auth");

exports.signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const resultUsername = await getDataAuthByUsername(username);
    if (!resultUsername.length > 0) {
      return res.json(
        Response(false, 400, `Username Not Found`, {
          name: "username",
        })
      );
    }

    const passwordUser = await bcryptjs.compare(
      password,
      resultUsername[0].password_hash
    );
    if (!passwordUser) {
      return res.json(
        Response(false, 400, "Password Wrong", {
          name: "password",
        })
      );
    }

    const resultEmployee = await getDataEmployeeById(
      resultUsername[0].employee_id_auth
    );
    if (resultEmployee[0].active === "0") {
      return res.json(
        Response(false, 400, "User is Not Active", {
          name: "user",
        })
      );
    }

    const payload = {
      userId: resultUsername[0].employee_id_auth,
      position: resultEmployee[0].position,
    };

    const token = signJWT(payload);
    return res.json(
      Response(true, 200, "Sign in Successfully", {
        token: token,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getUser = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await getDataEmployeeById(userId);
    return res.json(
      Response(true, 200, "Authentication Successfully", result[0])
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addAuth = async (req, res) => {
  const { employeeId, username, password } = req.body;

  try {
    const resultEmployee = await getDataEmployeeById(employeeId);
    if (!resultEmployee.length > 0) {
      return res.json(
        Response(false, 400, `Employee Id Not Found`, {
          name: "employeeId",
        })
      );
    }

    const resultUsername = await getDataAuthByUsername(username);
    if (resultUsername.length > 0) {
      return res.json(
        Response(false, 400, `Username Already`, {
          name: "username",
        })
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    await addDataAuth(employeeId, username, hashPassword, password);

    return res.json(Response(true, 201, "Added Auth Successfully", {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.detailAuth = async (req, res) => {
  const employeeId = req.query.employeeId;

  try {
    const resultEmployee = await getDataEmployeeById(employeeId);
    if (!resultEmployee.length > 0) {
      return res.json(
        Response(false, 400, `Employee Id Not Found`, {
          name: "employeeId",
        })
      );
    }

    const resultAuth = await getDataAuthByEmployeeId(employeeId);
    if (!resultAuth.length > 0) {
      return res.json(Response(true, 204, "Get Detail Auth Successfully", {}));
    }

    return res.json(
      Response(true, 200, "Get Detail Auth Successfully", resultAuth[0])
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateAuth = async (req, res) => {
  const { username, password } = req.body;
  const { id } = req.params;

  try {
    const resultAuthById = await getDataAuthByAuthId(id);
    if (!resultAuthById.length > 0) {
      return res.json(
        Response(false, 400, `Auth Id Not Found`, {
          name: "authId",
        })
      );
    }

    const resultAuthByUsername = await getDataAuthByUsernameNotById(
      id,
      username
    );
    if (resultAuthByUsername.length > 0) {
      return res.json(
        Response(false, 400, `Username Already`, {
          name: "username",
        })
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    await updateDataAuth(id, username, hashPassword, password);

    return res.json(Response(true, 201, "Update Auth Successfully", {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
