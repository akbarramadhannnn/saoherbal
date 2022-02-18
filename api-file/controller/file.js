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

exports.generateFilePdf = async (req, res) => {
  let data = req.body.data;
  const html = fs.readFileSync(
    path.join(__dirname, "../views/template-invoice.html"),
    "utf-8"
  );
  let filename = `${data.code}.pdf`;
  const invoiceNumber = `${moment(new Date()).format("YYYYMMDDHmmss")}`;
  // const invoiceDate = moment(new Date()).format("Do MMMM YYYY");
  // console.log("data", data);
  const invoiceDate = moment(new Date()).format("DD/MM/YYYY");

  const document = {
    html: html,
    data: {
      logo: `${config.server.host}:${config.server.port}/images/logo-sao.jpeg`,
      invoiceNumber: invoiceNumber,
      invoiceDate: invoiceDate,
      customerName: data.consumer.name,
      address: data.consumer.address,
      provinsi: ReplaceToStartUpperCase(data.consumer.provinsi),
      kabupaten: ReplaceToStartUpperCase(
        data.consumer.kabupaten.replace(/KAB./g, "")
      ),
      product: data.product.name,
      weight: `${data.price.weight}/${data.price.unit}`,
      qty: data.qty,
      price: `Rp ${ConvertToRupiah(data.price.prices)}`,
      total: `Rp ${ConvertToRupiah(data.subtotal)}`,
    },
    path: "./assets/pdf/product/invoice/" + filename,
  };
  pdf
    .create(document, options)
    .then((response) => {
      return res.json(
        Response(true, 201, `Generate PDF Product Successfully`, {
          url: `${config.server.host}:${config.server.port}/api/v1/product/pdf-invoice/${data.code}.pdf`,
        })
      );
    })
    .catch((err) => {
      console.log("err", err);
    });
};
