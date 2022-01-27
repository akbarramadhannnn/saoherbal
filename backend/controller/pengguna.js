const bcryptjs = require("bcryptjs");
const {
  addDataPengguna,
  getDataPenggunaByUsername,
} = require("../models/pengguna");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

exports.addPengguna = async (req, res) => {
  let { name, username, password, role } = req.body;
  name = ReplaceToStartUpperCase(name);

  try {
    const resultUsername = await getDataPenggunaByUsername(username);
    if (resultUsername.length > 0) {
      return res.json(
        Response(false, 400, `Username Already`, {
          name: "username",
        })
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    password = hashPassword;
    await addDataPengguna(name, username, password, role);
    return res.json(Response(true, 201, `Added Pengguna Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
