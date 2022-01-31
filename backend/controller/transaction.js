const moment = require("moment");
const GenerateCodeTransaction = require("../utils/generateCodeTransaction");
const {
  getDataTransactionAll,
  addDataTransaction,
  getDataTransactionByCode,
} = require("../models/transaction");
const { getDataStoreById } = require("../models/store");
const { getDataDistributorById } = require("../models/distributor");
const { getDataProductById } = require("../models/product");
const {
  getDataPriceById,
  getDataPriceByIdAndProductId,
} = require("../models/price");
const {
  getBillNumberByFirstDayAndLastDay,
  updateStatusPaymentBillEngineer,
} = require("../models/bill_engineer");
const {
  getDataProvinsiById,
  getDataKabupatenById,
} = require("../models/wilayah");
const Response = require("../helpers/response");
const { getFirstDayDate, getLastDayDate } = require("../utils/date");

exports.getTransaction = async (req, res) => {
  try {
    let result = await getDataTransactionAll();
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Transaction Not Found`, result));
    }

    for (let i = 0; i < result.length; i++) {
      if (result[i].distributor_id_transaction) {
        const resultDistributor = await getDataDistributorById(
          result[i].distributor_id_transaction
        );
        result[i].consumer = {
          consumer_id: resultDistributor[0].distributor_id,
          name: resultDistributor[0].name,
        };
      } else if (result[i].store_id_transaction) {
        const resultStore = await getDataStoreById(
          result[i].store_id_transaction
        );
        result[i].consumer = {
          consumer_id: resultStore[0].store_id,
          name: resultStore[0].name,
        };
      }
    }

    return res.json(
      Response(true, 200, `Get Transaction Successfully`, result)
    );
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addTransaction = async (req, res) => {
  const distributor_id = req.body.distributor_id || null;
  const store_id = req.body.store_id || null;
  const { consumer_type, product_id, price_id, qty } = req.body;

  const firstDay = moment(getFirstDayDate()).format("YYYY-MM-DD");
  const lastDay = moment(getLastDayDate()).format("YYYY-MM-DD");

  let id = "";
  if (store_id) {
    id = store_id;
  } else {
    id = distributor_id;
  }

  try {
    if (distributor_id && store_id) {
      return res.json(
        Response(false, 400, `Please Choose One Consumer`, {
          name: "consumer",
        })
      );
    }

    if (distributor_id && !store_id) {
      const resultDistributorById = await getDataDistributorById(
        distributor_id
      );
      if (!resultDistributorById.length > 0) {
        return res.json(
          Response(false, 400, `Distributor Id Not Found`, {
            name: "distributor_id",
          })
        );
      }
    }

    if (!distributor_id && store_id) {
      const resultStoreById = await getDataStoreById(store_id);
      if (!resultStoreById.length > 0) {
        return res.json(
          Response(false, 400, `Store Id Not Found`, {
            name: "store_id",
          })
        );
      }
    }

    const resultProductById = await getDataProductById(product_id);
    if (!resultProductById.length > 0) {
      return res.json(
        Response(false, 400, `Product Id Not Found`, {
          name: "product_id",
        })
      );
    }

    const resultPriceById = await getDataPriceById(price_id);
    if (!resultPriceById.length > 0) {
      return res.json(
        Response(false, 400, `Price Id Not Found`, {
          name: "price_id",
        })
      );
    }

    const resultPriceByIdAndProductId = await getDataPriceByIdAndProductId(
      price_id,
      product_id
    );
    if (!resultPriceByIdAndProductId.length > 0) {
      return res.json(
        Response(false, 400, `Price Id Not Match With Product Id`, {
          name: "price_id",
        })
      );
    }

    const resultBillNumber = await getBillNumberByFirstDayAndLastDay(
      firstDay,
      lastDay
    );
    if (!resultBillNumber.length > 0) {
      return res.json(
        Response(false, 400, `Bill Number Engineer Not Found`, {
          name: "bill_number_engineer",
        })
      );
    }

    if (resultBillNumber[0].payment_status === "0") {
      await updateStatusPaymentBillEngineer(
        resultBillNumber[0].bill_number,
        "1"
      );
    }

    const code = GenerateCodeTransaction(consumer_type, id);
    const subTotal = resultPriceByIdAndProductId[0].prices * qty;

    await addDataTransaction(
      store_id,
      distributor_id,
      product_id,
      price_id,
      resultBillNumber[0].bill_number,
      code,
      consumer_type,
      qty,
      subTotal
    );
    return res.json(Response(true, 201, `Added Transaction Successfully`, {}));
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getDetailTransaction = async (req, res) => {
  const code = req.query.code || "";
  try {
    const resultTransactionCode = await getDataTransactionByCode(code);
    if (!resultTransactionCode.length > 0) {
      return res.json(
        Response(false, 400, `Transaction Code Not Found`, {
          name: "code",
        })
      );
    }

    for (let i = 0; i < resultTransactionCode.length; i++) {
      if (resultTransactionCode[i].distributor_id_transaction) {
        const resultDistributor = await getDataDistributorById(
          resultTransactionCode[i].distributor_id_transaction
        );
        const resultProvinsi = await getDataProvinsiById(
          resultDistributor[0].distributor_prov_id
        );
        const resultKabupaten = await getDataKabupatenById(
          resultDistributor[0].distributor_kab_id
        );
        resultTransactionCode[i].consumer = {
          consumer_id: resultDistributor[0].distributor_id,
          name: resultDistributor[0].name,
          no_tlp: resultDistributor[0].no_tlp,
          address: resultDistributor[0].address,
          provinsi: resultProvinsi[0].name,
          kabupaten: resultKabupaten[0].name,
        };
      } else if (resultTransactionCode[i].store_id_transaction) {
        const resultStore = await getDataStoreById(
          resultTransactionCode[i].store_id_transaction
        );
        const resultProvinsi = await getDataProvinsiById(
          resultStore[0].store_prov_id
        );
        const resultKabupaten = await getDataKabupatenById(
          resultStore[0].store_kab_id
        );
        resultTransactionCode[i].consumer = {
          consumer_id: resultStore[0].store_id,
          name: resultStore[0].name,
          no_tlp: resultStore[0].no_tlp,
          address: resultStore[0].address,
          provinsi: resultProvinsi[0].name,
          kabupaten: resultKabupaten[0].name,
        };
      }
      delete resultTransactionCode[i].store_id_transaction;
      delete resultTransactionCode[i].distributor_id_transaction;
    }

    return res.json(
      Response(
        true,
        200,
        `Get Transaction Detail Successfully`,
        resultTransactionCode[0]
      )
    );
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
