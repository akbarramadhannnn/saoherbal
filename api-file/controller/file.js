const NODE_ENV = process.env.NODE_ENV;
const moment = require("moment");
require("moment/locale/id");
const config = require("../config/env");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-creator-node");
const Response = require("../helpers/response");

const options = require("../helpers/options");

const { ReplaceToStartUpperCase } = require("../utils/replace");
const { ConvertToRupiah } = require("../utils/convert");

exports.uploadSingleImage = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    const { name, type } = fields;
    const { image } = files;
    const nameFile = `${ReplaceToStartUpperCase(name)}-${
      image.originalFilename
    }`;
    var oldPath = image.filepath;
    let newPath;
    if (type === "product") {
      newPath = "./assets/images/product";
    }
    const pathFile = path.resolve(newPath, nameFile);
    var rawData = fs.readFileSync(oldPath);
    fs.writeFile(pathFile, rawData, (err) => {
      if (err) {
        const error = JSON.stringify(err, undefined, 2);
        return res.json(Response(false, 500, `Error`, JSON.parse(error)));
      }
      return res.json(
        Response(true, 201, `Upload Image Successfully`, {
          nameFile: nameFile,
        })
      );
    });
  });
};

exports.deleteSingleImage = (req, res) => {
  const { type, name } = req.params;
  let pathOld;
  if (type === "product") {
    pathOld = path.resolve("./assets/images/product", name);
  }
  const cekFoto = fs.existsSync(pathOld);
  if (!cekFoto) {
    return res.json(
      Response(false, 400, `File Name Image Not Found`, { name: "image" })
    );
  }
  fs.unlinkSync(pathOld);
  return res.json(Response(true, 200, `Deleted Image Successfully`, {}));
};
