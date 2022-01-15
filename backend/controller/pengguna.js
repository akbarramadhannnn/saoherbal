const bcryptjs = require("bcryptjs");
const {
  addDataPengguna,
  getDataPenggunaByUsername,
} = require("../models/pengguna");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

exports.addPengguna = (req, res) => {
  let { name, username, password, role } = req.body;
  getDataPenggunaByUsername(username, async (errUsername, resultUsername) => {
    if (errUsername) {
      const error = JSON.stringify(errUsername, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (resultUsername.length > 0) {
      return res.json(
        Response(false, 400, `Username Already`, {
          name: "username",
        })
      );
    } else {
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
      name = ReplaceToStartUpperCase(name);
      password = hashPassword;
      addDataPengguna(name, username, password, role, (errAdd, resultAdd) => {
        if (errAdd) {
          const error = JSON.stringify(errAdd, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        }
        return res.json(Response(true, 201, `Added Pengguna Successfully`, {}));
      });
    }
  });
};
