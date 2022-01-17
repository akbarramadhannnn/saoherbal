const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const Response = require("../helpers/response");

exports.uploadSingleImage = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    const { name } = fields;
    const { image } = files;
    var oldPath = image.filepath;
    let newPath;
    if (name === "product") {
      newPath = "./assets/images/product";
    }
    const pathFile = path.resolve(newPath, image.originalFilename);
    var rawData = fs.readFileSync(oldPath);
    fs.writeFile(pathFile, rawData, (err) => {
      if (err) {
        const error = JSON.stringify(err, undefined, 2);
        return res.json(Response(false, 500, `Error`, JSON.parse(error)));
      }
      return res.json(
        Response(true, 201, `Upload Image Successfully`, {
          path: image.originalFilename,
        })
      );
    });
  });
};

exports.deleteSingleImage = (req, res) => {
  const { name } = req.params;
  const pathOld = path.resolve("./assets/images/product", name);
  const cekFoto = fs.existsSync(pathOld);
  if (!cekFoto) {
    return res.json(
      Response(false, 400, `File Name Image Not Found`, { name: "image" })
    );
  }
  fs.unlinkSync(pathOld);
  return res.json(Response(true, 200, `Deleted Image Successfully`, {}));
};
