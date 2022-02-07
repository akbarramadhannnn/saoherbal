const moment = require("moment");
const GenerateCodeTransaction = require("../utils/generateCodeTransaction");
const {
  getDataTransactionAll,
  addDataTransaction,
  getDataTransactionByCode,
  addMultipleDetailTransactionProduct,
  addDueDateTransaction,
  getDataTransactionById,
  updateDataBillAndBillTransaction,
  updateDataStatusTransaction,
} = require("../models/transaction");
const {
  getDataDueDateTransactionByTransactionId,
  getDataDueDateById,
  updateDataDueDateById,
  addDueDateDataTransactionIdStartDateEndDate,
} = require("../models/transaction_due_date");
const { getDataStoreById } = require("../models/store");
const { getDataDistributorById } = require("../models/distributor");
const { getDataProductById } = require("../models/product");
const {
  getDataPriceById,
  getDataPriceByIdAndProductId,
  getPriceByProductId,
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

      if (result[i].transaction_type === "tempo") {
        const resultDueDate = await getDataDueDateTransactionByTransactionId(
          result[i].transaction_id
        );
        result[i].dueDate = resultDueDate[resultDueDate.length - 1];
      }

      if (result[i].transaction_type === "titip") {
        const resultDueDate = await getDataDueDateTransactionByTransactionId(
          result[i].transaction_id
        );
        result[i].dueDate = resultDueDate[resultDueDate.length - 1];
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
  const { consumer_type, transaction_type, dueDate, productList } = req.body;

  try {
    if (!distributor_id && !store_id) {
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

    let consumer_id = "";
    if (store_id) {
      consumer_id = store_id;
    } else {
      consumer_id = distributor_id;
    }

    let status = "";
    if (transaction_type === "cash") {
      status = "1";
    } else {
      status = "0";
    }

    const arrProductPriceList = [];
    for (let i = 0; i < productList.length; i++) {
      const price = await getDataPriceByIdAndProductId(
        productList[i].priceId,
        productList[i].productId
      );

      let total = 0;
      let sellPrice = 0;

      if (productList[i].discount) {
        const countDiscount = (productList[i].discount / 100) * price[0].prices;
        const totalPriceDiscount = price[0].prices - countDiscount;
        sellPrice = totalPriceDiscount;
        if (productList[i].qty) {
          total = totalPriceDiscount * productList[i].qty;
        } else {
          total = totalPriceDiscount;
        }
      } else {
        if (productList[i].qty) {
          total = price[0].prices * productList[i].qty;
        } else {
          total = price[0].prices;
        }
        sellPrice = price[0].prices;
      }

      arrProductPriceList.push({
        product_id_transaction_product_detail: productList[i].productId,
        price_id_transaction_product_detail: productList[i].priceId,
        discount: productList[i].discount,
        qty: productList[i].qty,
        sellPrice: sellPrice,
        total_price: total,
      });
    }

    const subtotal = arrProductPriceList.reduce((a, b) => {
      return a + b.total_price;
    }, 0);

    // console.log('consumer_type', consumer_type)
    // console.log('consumer_id', consumer_id)
    // console.log('transaction_type', transaction_type)
    // console.log('dueDate', dueDate)
    // console.log('productList', productList)

    // const resultProductById = await getDataProductById(product_id);
    // if (!resultProductById.length > 0) {
    //   return res.json(
    //     Response(false, 400, `Product Id Not Found`, {
    //       name: "product_id",
    //     })
    //   );
    // }

    // const resultPriceById = await getDataPriceById(price_id);
    // if (!resultPriceById.length > 0) {
    //   return res.json(
    //     Response(false, 400, `Price Id Not Found`, {
    //       name: "price_id",
    //     })
    //   );
    // }

    // const resultPriceByIdAndProductId = await getDataPriceByIdAndProductId(
    //   price_id,
    //   product_id
    // );
    // if (!resultPriceByIdAndProductId.length > 0) {
    //   return res.json(
    //     Response(false, 400, `Price Id Not Match With Product Id`, {
    //       name: "price_id",
    //     })
    //   );
    // }

    const firstDay = moment(getFirstDayDate()).format("YYYY-MM-DD");
    const lastDay = moment(getLastDayDate()).format("YYYY-MM-DD");
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

    // if (resultBillNumber[0].payment_status === "0") {
    //   await updateStatusPaymentBillEngineer(
    //     resultBillNumber[0].bill_number,
    //     "1"
    //   );
    // }

    // const subTotal = resultPriceByIdAndProductId[0].prices * qty;

    const storeId = store_id;
    const distributorId = distributor_id;
    const billNumberEngineer = resultBillNumber[0].bill_number;
    const code = GenerateCodeTransaction(consumer_type, consumer_id);
    const consumerType = consumer_type;
    const transactionType = transaction_type;

    const resultAddTransaction = await addDataTransaction(
      storeId,
      distributorId,
      billNumberEngineer,
      code,
      consumerType,
      transactionType,
      subtotal,
      status
    );

    if (transactionType === "titip" || transactionType === "tempo") {
      await addDueDateTransaction(
        resultAddTransaction.insertId,
        dueDate.startDate,
        dueDate.endDate
      );
    }

    const dataAddDetailProductTransaction = [];
    for (let i = 0; i < arrProductPriceList.length; i++) {
      dataAddDetailProductTransaction.push([
        resultAddTransaction.insertId,
        arrProductPriceList[i].product_id_transaction_product_detail,
        arrProductPriceList[i].price_id_transaction_product_detail,
        arrProductPriceList[i].discount,
        arrProductPriceList[i].qty,
        arrProductPriceList[i].sellPrice,
        arrProductPriceList[i].total_price,
      ]);
    }
    await addMultipleDetailTransactionProduct(dataAddDetailProductTransaction);
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
    let resultTransactionCode = await getDataTransactionByCode(code);
    if (!resultTransactionCode.length > 0) {
      return res.json(
        Response(false, 400, `Transaction Code Not Found`, {
          name: "code",
        })
      );
    }

    if (resultTransactionCode[0].distributor_id_transaction) {
      const resultDistributor = await getDataDistributorById(
        resultTransactionCode[0].distributor_id_transaction
      );
      const resultProvinsi = await getDataProvinsiById(
        resultDistributor[0].distributor_prov_id
      );
      const resultKabupaten = await getDataKabupatenById(
        resultDistributor[0].distributor_kab_id
      );
      resultTransactionCode[0].consumer = {
        consumer_id: resultDistributor[0].distributor_id,
        name: resultDistributor[0].name,
        no_tlp: resultDistributor[0].no_tlp,
        address: resultDistributor[0].address,
        provinsi: resultProvinsi[0].name,
        kabupaten: resultKabupaten[0].name,
      };
    } else if (resultTransactionCode[0].store_id_transaction) {
      const resultStore = await getDataStoreById(
        resultTransactionCode[0].store_id_transaction
      );
      const resultProvinsi = await getDataProvinsiById(
        resultStore[0].store_prov_id
      );
      const resultKabupaten = await getDataKabupatenById(
        resultStore[0].store_kab_id
      );
      resultTransactionCode[0].consumer = {
        consumer_id: resultStore[0].store_id,
        name: resultStore[0].name,
        no_tlp: resultStore[0].no_tlp,
        address: resultStore[0].address,
        provinsi: resultProvinsi[0].name,
        kabupaten: resultKabupaten[0].name,
      };
    }

    // Get Data Tempo
    if (resultTransactionCode[0].transaction_type === "tempo") {
      const resultDueDate = await getDataDueDateTransactionByTransactionId(
        resultTransactionCode[0].transaction_id
      );

      for (let i = 0; i < resultDueDate.length; i++) {
        resultDueDate[i].tempo = i + 1;
      }
      resultTransactionCode[0].dueDate = resultDueDate;
    }

    // Mapping Product
    for (let i = 0; i < resultTransactionCode[0].product.length; i++) {
      const resultProduct = await getDataProductById(
        resultTransactionCode[0].product[i].productId
      );
      resultTransactionCode[0].product[i].name = resultProduct[0].name;

      const resultPrice = await getDataPriceByIdAndProductId(
        resultTransactionCode[0].product[i].priceId,
        resultTransactionCode[0].product[i].productId
      );
      resultTransactionCode[0].product[i].productPrice = resultPrice[0].prices;
      resultTransactionCode[0].product[
        i
      ].weight = `${resultPrice[0].weight}/${resultPrice[0].unit}`;
    }

    delete resultTransactionCode[0].store_id_transaction;
    delete resultTransactionCode[0].distributor_id_transaction;

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

exports.updateDueDateTransaction = async (req, res) => {
  let { type, description, paid } = req.body;
  let { id } = req.params;
  try {
    if (type === "tempo") {
      const resultTempo = await getDataDueDateById(id);
      if (!resultTempo.length > 0) {
        return res.json(
          Response(false, 400, `Due Date Id Not Found`, {
            name: "id",
          })
        );
      } else if (resultTempo[0].status_transaction_due_date === "0") {
        return res.json(
          Response(
            false,
            400,
            `The due date cannot be edited, because it has not passed the due date`,
            {
              name: "due_date_status",
            }
          )
        );
      }
      const transactionId = resultTempo[0].transaction_id_transaction_due_date;
      const listDueDate = await getDataDueDateTransactionByTransactionId(
        transactionId
      );
      const resultTransaction = await getDataTransactionById(transactionId);
      const resultTotalPaidTempo = listDueDate
        .filter((d) => d.paid !== null)
        .reduce((a, b) => {
          return a + b.paid;
        }, 0);
      const sumTotalPaid = resultTotalPaidTempo + paid;
      const sumTotalBill = resultTransaction[0].subtotal - sumTotalPaid;
      await updateDataBillAndBillTransaction(
        transactionId,
        sumTotalPaid,
        sumTotalBill
      );
      await updateDataDueDateById(id, description, paid);
      return res.json(
        Response(true, 201, `Updated Due Date Successfully`, {
          sumTotalPaid,
          sumTotalBill,
        })
      );
    }
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addDueDateTransaction = async (req, res) => {
  const { type, transactionId, startDate, endDate } = req.body;
  try {
    const resultTransaction = await getDataTransactionById(transactionId);
    if (!resultTransaction.length > 0) {
      return res.json(
        Response(false, 400, `Transaction Id Not Found`, {
          name: "transactionId",
        })
      );
    }

    const resultAddDueDate = await addDueDateDataTransactionIdStartDateEndDate(
      transactionId,
      startDate,
      endDate
    );
    let resultDataDueDateById = await getDataDueDateById(
      resultAddDueDate.insertId
    );
    const resultDataDueDate = await getDataDueDateTransactionByTransactionId(
      transactionId
    );
    resultDataDueDateById[0].tempo = resultDataDueDate.length;
    return res.json(
      Response(
        true,
        201,
        `Added Due Date Successfully`,
        resultDataDueDateById[0]
      )
    );
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateStatusTransaction = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    const resultTransaction = await getDataTransactionById(id);
    if (!resultTransaction.length > 0) {
      return res.json(
        Response(false, 400, `Transaction Id Not Found`, {
          name: "transactionId",
        })
      );
    }

    await updateDataStatusTransaction(id, status);
    return res.json(
      Response(true, 201, `Updated Transaction Status Successfully`, {
        status,
      })
    );
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
