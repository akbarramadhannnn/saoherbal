const NODE_ENV = process.env.NODE_ENV;
const moment = require("moment");
require("moment/locale/id");
const config = require("../config/env");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-creator-node");
const Response = require("../helpers/response");

const options = require("../helpers/options");

exports.generateInvoiceTransaction = async (req, res) => {
  let data = req.body.data;
  const invoiceNumber = `INVCTRC${moment(data.created_at).format(
    "YYYYMMDD"
  )}${moment(data.created_at).format("mhhss")}${data.transactionNumber}`;
  const html = fs.readFileSync(
    path.join(__dirname, "../views/template-invoice.html"),
    "utf-8"
  );
  let filename = `${invoiceNumber}.pdf`;
  // const invoiceDate = moment(new Date()).format("Do MMMM YYYY");
  // console.log("data", data);
  const invoiceDate = moment(new Date()).format("DD/MM/YYYY");

  const document = {
    html: html,
    data: {
      invoiceNumber: invoiceNumber,
      // logo: `${config.server.host}:${config.server.port}/images/logo-sao.jpeg`,
      // invoiceDate: invoiceDate,
      // customerName: data.consumer.name,
      // address: data.consumer.address,
      // provinsi: ReplaceToStartUpperCase(data.consumer.provinsi),
      // kabupaten: ReplaceToStartUpperCase(
      //   data.consumer.kabupaten.replace(/KAB./g, "")
      // ),
      // product: data.product.name,
      // weight: `${data.price.weight}/${data.price.unit}`,
      // qty: data.qty,
      // price: `Rp ${ConvertToRupiah(data.price.prices)}`,
      // total: `Rp ${ConvertToRupiah(data.subtotal)}`,
    },
    path: "./assets/pdf/transaction/invoice-transaction/" + filename,
  };
  pdf
    .create(document, options)
    .then((response) => {
      let url;
      if (NODE_ENV === "local" || NODE_ENV === "development") {
        url = `${config.server.host}:${config.server.port}/api/v1/transaction/invoice-transaction`;
      } else {
        url = `${config.server.host}/file/transaction/invoice-transaction`;
      }
      return res.json(
        Response(true, 201, `Generate PDF Product Successfully`, {
          url: `${url}/${filename}`,
        })
      );
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.generateInvoiceTransactionTempo = async (req, res) => {
  const { data } = req.body;
  const invoiceNumber = `INVCTMP${moment(data.tempo.created_at).format(
    "YYYYMMDD"
  )}${moment(data.tempo.created_at).format("mhhss")}${data.tempo.tempoNumber}`;
  const html = fs.readFileSync(
    path.join(__dirname, "../views/template-invoice-detail-tempo.html"),
    "utf-8"
  );
  const fileName = `${invoiceNumber}.pdf`;
  const document = {
    html: html,
    data: {
      invoiceNumber,
      transactionType: "Tempo",
    },
    path: "./assets/pdf/transaction/invoice-tempo/" + fileName,
  };
  pdf
    .create(document, options)
    .then((response) => {
      let url;
      if (NODE_ENV === "local" || NODE_ENV === "development") {
        url = `${config.server.host}:${config.server.port}/api/v1/transaction/invoice-tempo`;
      } else {
        url = `${config.server.host}/file/transaction/invoice-tempo`;
      }
      return res.json(
        Response(true, 201, `Generate Invoice Transaction Tempo Successfully`, {
          url: `${url}/${fileName}`,
        })
      );
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.downloadInvoice = (req, res) => {
  const { name } = req.params;
  const file = path.join(
    __dirname,
    "..",
    `/assets/pdf/transaction/invoice-tempo/${name}`
  );
  // res.setHeader("Content-Type", "application/pdf");
  // res.setHeader(`Content-Disposition', 'attachment; filename=${name}.pdf`);
  res.download(file);
};