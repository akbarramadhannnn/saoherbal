const moment = require("moment");
const {
  addDataBillEngineer,
  getDataBillEngineer,
  getDataDetailByBillNumber,
  getDataBillEngineerByBillNumber,
  updateStatusPaymentBillEngineer,
  getBillNumberByBillNumber,
} = require("../models/bill_engineer");
const Response = require("../helpers/response");
const { getFirstDayDate, getLastDayDate } = require("../utils/date");
const { potonganHarga } = require("../utils/constant");

exports.getBill = async (req, res) => {
  const type = req.query.type || "";
  try {
    if (type === "engineer") {
      const result = await getDataBillEngineer();
      if (!result.length > 0) {
        return res.json(
          Response(true, 204, `Get Bill ${type} Successfully`, result)
        );
      }
      return res.json(
        Response(true, 200, `Get Bill ${type} Successfully`, result)
      );
    } else {
      return res.json(
        Response(false, 400, `Type Bill Not Found`, {
          name: "type",
        })
      );
    }
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addBill = async (req, res) => {
  const { type } = req.body;
  try {
    if (type === "engineer") {
      const billNumber = `${moment(getFirstDayDate()).format(
        "YYYYMMDD"
      )}${moment(getLastDayDate()).format("YYYYMMDD")}`;

      let result = await getBillNumberByBillNumber(billNumber);
      if (result.length > 0) {
        return res.json(Response(true, 400, `Bill Number Already`, {}));
      }

      const convertFirstDay = moment(getFirstDayDate()).format("YYYY-MM-DD");
      const convertLastDay = moment(getLastDayDate()).format("YYYY-MM-DD");

      await addDataBillEngineer(billNumber, convertFirstDay, convertLastDay);
      return res.json(
        Response(true, 201, `Added Bill ${type} Successfully`, {})
      );
    } else {
      return res.json(
        Response(false, 400, `Type Bill Not Found`, {
          name: "type",
        })
      );
    }
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getDetailBill = async (req, res) => {
  const billNumber = req.query.billNumber || "";
  try {
    let result = await getDataDetailByBillNumber(billNumber);
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Bill Successfully`, result));
    }

    if (result[0].transaction.length > 1) {
      for (let i = 0; i < result[0].transaction.length; i++) {
        result[0].transaction[i].potonganHarga = potonganHarga;
        result[0].transaction[i].jumlah =
          result[0].transaction[i].qty * potonganHarga;
      }
      const total = result[0].transaction.reduce((a, b) => {
        return a.jumlah + b.jumlah;
      });
      result[0].total = total;
    } else {
      result[0].transaction = [];
    }

    return res.json(Response(true, 200, `Get Bill Successfully`, result[0]));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updatePaymentStatusBill = async (req, res) => {
  const billNumber = req.params.billNumber;
  const { type, paymentStatus } = req.body;

  try {
    if (type === "engineer") {
      const resultDataBillEngineer = await getDataBillEngineerByBillNumber(
        billNumber
      );
      const lastDayNow = moment(getLastDayDate()).format("YYYY-MM-DD");
      const lastDayBill = moment(resultDataBillEngineer[0].last_day).format(
        "YYYY-MM-DD"
      );
      if (lastDayNow > lastDayBill) {
        if (resultDataBillEngineer.length > 0) {
          let status;
          if (
            resultDataBillEngineer[0].payment_status === "0" &&
            paymentStatus === "1"
          ) {
            status = paymentStatus;
          } else if (
            resultDataBillEngineer[0].payment_status === "1" &&
            paymentStatus === "2"
          ) {
            status = paymentStatus;
          } else if (
            resultDataBillEngineer[0].payment_status === "2" &&
            paymentStatus === "3"
          ) {
            status = paymentStatus;
          } else if (
            resultDataBillEngineer[0].payment_status === "2" &&
            paymentStatus === "1"
          ) {
            status = paymentStatus;
          } else {
            return res.json(
              Response(
                false,
                400,
                `Payment Status Can't Update, Please Check the Value`,
                {
                  name: "paymentStatus",
                }
              )
            );
          }
          await updateStatusPaymentBillEngineer(billNumber, status);
          return res.json(
            Response(true, 201, `Updated Bill Payment Status Successfully`, {
              status: status,
            })
          );
        }
      } else {
        return res.json(
          Response(
            false,
            400,
            `Can't Update the Payment Status Because It's Not Time Yet`,
            {
              name: "date",
            }
          )
        );
      }
    } else {
      return res.json(
        Response(false, 400, `Type Bill Not Found`, {
          name: "type",
        })
      );
    }
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
