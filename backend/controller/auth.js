const bcryptjs = require("bcryptjs");
const {
  getDataPenggunaByUsername,
  getDataPenggunaById,
} = require("../models/pengguna");
const Response = require("../helpers/response");
const { signJWT } = require("../middleware/auth");

exports.signIn = (req, res) => {
  const { username, password } = req.body;
  getDataPenggunaByUsername(username, async (errUsername, resultUsername) => {
    if (errUsername) {
      const error = JSON.stringify(errUsername, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultUsername.length > 0) {
      return res.json(
        Response(false, 400, `Username Not Found`, {
          name: "username",
        })
      );
    } else {
      const passwordUser = await bcryptjs.compare(
        password,
        resultUsername[0].password
      );
      if (!passwordUser) {
        return res.json(
          Response(false, 400, "Password Wrong", {
            name: "password",
          })
        );
      } else {
        const payload = {
          userId: resultUsername[0].pengguna_id,
        };
        const token = signJWT(payload);
        return res.json(
          Response(true, 200, "Sign in Successfully", {
            token: token,
          })
        );
      }
    }
  });
};

exports.getUser = (req, res) => {
  const userId = req.userId;
  getDataPenggunaById(userId, async (err, result) => {
    if (err) {
      const error = JSON.stringify(err, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    }

    return res.json(
      Response(true, 200, "Authentication Successfully", result[0])
    );
  });
};
