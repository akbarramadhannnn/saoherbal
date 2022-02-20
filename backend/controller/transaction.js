const moment = require("moment");
const GenerateCodeTransaction = require("../utils/generateCodeTransaction");
const {
  getDataTransactionAll,
  addDataTransaction,
  getDataTransactionByCode,
  addMultipleDetailTransactionProduct,
  getDataTransactionById,
  updateDataBillAndBillTransaction,
  updateDataStatusTransaction,
  getDetailTransactionProductById,
  updateTotalLefDetailProductById,
  updateTotalPaidPriceTransaction,
  getTotalDataTransaction,
  getDataTransactionByDate,
} = require("../models/transaction");
const {
  getDataDueDateTransactionByTransactionId,
  getDataDueDateById,
  updateDataDueDateById,
  addDueDateDataTransactionIdStartDateEndDate,
  addDataDueDateTransaction,
  updateDataDueDateStatusById,
  getAllDataDueDateTransactionByStatus,
  updateMultipleDataDueDateStatusById,
} = require("../models/transaction_due_date");
const {
  addDataTransactionTempoDetail,
  getDataTransactionTempoDetailByDueDateId,
  getDataTempoDetailByTempoId,
  updateDataTransactionTempoDetail,
  getAllDataTempoDetailByTransactionId,
} = require("../models/transaction_tempo_detail");
const {
  getDataTransactionTitipDetailByTransactionIdAndDueDateId,
  addMultipleTransactionTitip,
  getDataTransactionTitipDetailByTransactionId,
} = require("../models/transaction_titip_detail");
const { getDataStoreById } = require("../models/store");
const { getDataDistributorById } = require("../models/distributor");
const { getDataProductById } = require("../models/product");
const { getDataEmployeeById } = require("../models/employee");
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
const { getDataConfigureByModuleAndKey } = require("../models/configure");
const Response = require("../helpers/response");
const { getFirstDayDate, getLastDayDate } = require("../utils/date");
const { ReplaceToRupiah } = require("../utils/replace");
const CalculateDistance = require("../utils/calculateDistance");

exports.getTransaction = async (req, res) => {
  const userId = req.userId;
  const position = req.position;

  // Pagination
  const pagination = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const resultTotalCategory = await getTotalDataTransaction();
    const total = resultTotalCategory[0].total;
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    const totalPage = Math.ceil(total / limit);

    let result = await getDataTransactionAll(startIndex, limit);

    if (!result.length > 0) {
      return res.json(Response(true, 204, `Transaction Not Found`, {}));
    }

    if (position === "2") {
      result = result.filter((d) => d.employee_id_transaction === userId);
    }

    // Get Data Dsitributor
    for (let i = 0; i < result.length; i++) {
      if (result[i].distributor_id_transaction) {
        const resultDistributor = await getDataDistributorById(
          result[i].distributor_id_transaction
        );
        result[i].consumer = {
          consumer_id: resultDistributor[0].distributor_id,
          name: resultDistributor[0].name,
          latitude: resultDistributor[0].latitude,
          longitude: resultDistributor[0].longitude,
        };
      } else if (result[i].store_id_transaction) {
        const resultStore = await getDataStoreById(
          result[i].store_id_transaction
        );
        result[i].consumer = {
          consumer_id: resultStore[0].store_id,
          name: resultStore[0].name,
          latitude: resultStore[0].latitude,
          longitude: resultStore[0].longitude,
        };
      }

      const resultEmployee = await getDataEmployeeById(
        result[i].employee_id_transaction
      );

      result[i].employee = {
        employeeId: resultEmployee[0].employee_id,
        name: resultEmployee[0].name,
      };

      if (
        result[i].transaction_type === "tempo" ||
        result[i].transaction_type === "titip"
      ) {
        const resultDueDate = await getDataDueDateTransactionByTransactionId(
          result[i].transaction_id
        );
        result[i].dueDate = resultDueDate[resultDueDate.length - 1];
      }
    }

    return res.json(
      Response(true, 200, `Get Transaction Successfully`, {
        data: result,
        totalPage,
        pagination,
      })
    );
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addTransaction = async (req, res) => {
  const distributor_id = req.body.distributor_id || null;
  const userId = req.userId;
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

    const storeId = store_id;
    const distributorId = distributor_id;
    const billNumberEngineer = resultBillNumber[0].bill_number;
    const code = GenerateCodeTransaction(consumer_type, consumer_id);
    const consumerType = consumer_type;
    const transactionType = transaction_type;

    // Create Data Transaction
    const resultAddTransaction = await addDataTransaction(
      storeId,
      distributorId,
      billNumberEngineer,
      userId,
      code,
      consumerType,
      transactionType,
      subtotal,
      status
    );

    // Create Data Tempo & Tempo Detail Transaction
    if (transactionType === "tempo" || transactionType === "titip") {
      const resultAddDueDate =
        await addDueDateDataTransactionIdStartDateEndDate(
          resultAddTransaction.insertId,
          dueDate.startDate,
          dueDate.endDate
        );

      if (transactionType === "tempo") {
        await addDataTransactionTempoDetail(
          resultAddTransaction.insertId,
          resultAddDueDate.insertId
        );
      }
    }

    // Create Data Detail Product Transaction
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

    // Mapping Consumer
    if (resultTransactionCode[0].distributor_id_transaction) {
      const resultDistributor = await getDataDistributorById(
        resultTransactionCode[0].distributor_id_transaction
      );
      resultTransactionCode[0].consumer = {
        consumer_id: resultDistributor[0].distributor_id,
        name: resultDistributor[0].name,
        no_tlp: resultDistributor[0].no_tlp,
        address: resultDistributor[0].address,
        provinsiId: resultDistributor[0].distributor_prov_id,
        kabupatenId: resultDistributor[0].distributor_kab_id,
        latitude: resultDistributor[0].latitude,
        longitude: resultDistributor[0].longitude,
      };
    } else if (resultTransactionCode[0].store_id_transaction) {
      const resultStore = await getDataStoreById(
        resultTransactionCode[0].store_id_transaction
      );
      resultTransactionCode[0].consumer = {
        consumer_id: resultStore[0].store_id,
        name: resultStore[0].name,
        no_tlp: resultStore[0].no_tlp,
        address: resultStore[0].address,
        provinsiId: resultStore[0].store_prov_id,
        kabupatenId: resultStore[0].store_kab_id,
        latitude: resultStore[0].latitude,
        longitude: resultStore[0].longitude,
      };
    }

    const resultProvinsi = await getDataProvinsiById(
      resultTransactionCode[0].consumer.provinsiId
    );
    const resultKabupaten = await getDataKabupatenById(
      resultTransactionCode[0].consumer.kabupatenId
    );

    resultTransactionCode[0].consumer = {
      ...resultTransactionCode[0].consumer,
      provinsi: resultProvinsi[0].name,
      kabupaten: resultKabupaten[0].name,
    };

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

    // Get Data Tempo
    if (
      resultTransactionCode[0].transaction_type === "tempo" ||
      resultTransactionCode[0].transaction_type === "titip"
    ) {
      const resultDueDate = await getDataDueDateTransactionByTransactionId(
        resultTransactionCode[0].transaction_id
      );

      for (let i = 0; i < resultDueDate.length; i++) {
        if (resultTransactionCode[0].transaction_type === "tempo") {
          resultDueDate[i].tempo = i + 1;
          const resultDetailTempo =
            await getDataTransactionTempoDetailByDueDateId(
              resultDueDate[i].transaction_due_date_id
            );
          resultDueDate[i].tempoDetailId =
            resultDetailTempo[0].transaction_tempo_detail_id;
          resultDueDate[i].description = resultDetailTempo[0].description;
          resultDueDate[i].paidPrice = resultDetailTempo[0].paid_price;
          resultDueDate[i].created_at = resultDetailTempo[0].created_at;
        } else if (resultTransactionCode[0].transaction_type === "titip") {
          resultDueDate[i].titip = i + 1;
          let resultTitipDetail =
            await getDataTransactionTitipDetailByTransactionIdAndDueDateId(
              resultDueDate[i].id_transaction_transaction_due_date,
              resultDueDate[i].transaction_due_date_id
            );

          if (resultTitipDetail.length > 0) {
            for (let j = 0; j < resultTitipDetail.length; j++) {
              if (
                resultTransactionCode[0].product[j].transactionDetailId ===
                resultTitipDetail[j].id_product_transaction_titip_detail
              ) {
                resultTitipDetail[j].name =
                  resultTransactionCode[0].product[j].name;
                resultTitipDetail[j].sell_price =
                  resultTransactionCode[0].product[j].sellPrice;
              }
            }
          }
          resultDueDate[i].product = resultTitipDetail;
        }
      }
      resultTransactionCode[0].dueDate = resultDueDate;
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

exports.updateTempoTransaction = async (req, res) => {
  let { description, paid, dueDateStatus, coordinate } = req.body;
  let { id } = req.params;
  try {
    const resultTempo = await getDataTempoDetailByTempoId(id);
    if (!resultTempo.length > 0) {
      return res.json(
        Response(false, 400, `Tempo Detail Id Code Not Found`, {
          name: "tempoDetailId",
        })
      );
    }

    const dueDateId = resultTempo[0].id_due_date_transaction_tempo_detail;
    const resultDueDate = await getDataDueDateById(dueDateId);

    if (!resultDueDate.length > 0) {
      return res.json(
        Response(false, 400, `Due Date Id Code Not Found`, {
          name: "dueDateId",
        })
      );
    }

    if (resultDueDate[0].status_transaction_due_date === "0") {
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

    const transactionId = resultDueDate[0].id_transaction_transaction_due_date;
    let listDueDate = await getDataDueDateTransactionByTransactionId(
      transactionId
    );
    for (let i = 0; i < listDueDate.length; i++) {
      const resultListTempo = await getDataTransactionTempoDetailByDueDateId(
        listDueDate[i].transaction_due_date_id
      );
      delete resultListTempo[0].id_due_date_transaction_tempo_detail;
      listDueDate[i] = {
        ...listDueDate[i],
        ...resultListTempo[0],
      };
    }

    const resultTransaction = await getDataTransactionById(transactionId);
    if (paid > resultTransaction[0].total_bill_price) {
      return res.json(
        Response(
          false,
          400,
          `max paid Rp${ReplaceToRupiah(
            resultTransaction[0].total_bill_price
          )}`,
          {
            name: "paid",
          }
        )
      );
    }

    let resultDistance;
    if (resultTransaction[0].distributor_id_transaction) {
      const resultDistributor = await getDataDistributorById(
        resultTransaction[0].distributor_id_transaction
      );
      const latitudeDistributor = resultDistributor[0].latitude;
      const longitudeDistributor = resultDistributor[0].longitude;
      resultDistance = CalculateDistance(
        coordinate.latitude,
        coordinate.longitude,
        latitudeDistributor,
        longitudeDistributor
      );
    }

    if (resultTransaction[0].store_id_transaction) {
      const resultStore = await getDataStoreById(
        resultTransaction[0].store_id_transaction
      );
      const latitudeDistributor = resultStore[0].latitude;
      const longitudeDistributor = resultStore[0].longitude;
      resultDistance = CalculateDistance(
        coordinate.latitude,
        coordinate.longitude,
        latitudeDistributor,
        longitudeDistributor
      );
    }

    const resultConfigure = await getDataConfigureByModuleAndKey(
      "TRANSACTION",
      "radius"
    );
    if (
      resultDistance >
      parseFloat(ReplaceToRupiah(resultConfigure[0].value)).toFixed(1)
    ) {
      return res.json(
        Response(
          false,
          400,
          `max distance ${parseFloat(
            ReplaceToRupiah(resultConfigure[0].value)
          )}km`,
          {
            name: "distance",
          }
        )
      );
    }

    const resultTotalPaidTempo = listDueDate
      .filter((d) => d.paid_price !== null)
      .reduce((a, b) => {
        return a + b.paid_price;
      }, 0);
    const sumTotalPaid = resultTotalPaidTempo + paid;
    const sumTotalBill = resultTransaction[0].subtotal_price - sumTotalPaid;
    const dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    await updateDataTransactionTempoDetail(id, description, paid, dateTime);
    await updateDataBillAndBillTransaction(
      transactionId,
      sumTotalPaid,
      sumTotalBill
    );
    await updateDataDueDateStatusById(dueDateId, dueDateStatus);
    return res.json(
      Response(true, 201, `Updated Due Date Successfully`, {
        sumTotalPaid,
        sumTotalBill,
        dueDateStatus,
        dateTime,
      })
    );
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

    let result = {};
    if (type === "tempo") {
      await addDataTransactionTempoDetail(
        transactionId,
        resultAddDueDate.insertId
      );

      let resultDataDueDateById = await getDataDueDateById(
        resultAddDueDate.insertId
      );
      const resultDetailTempo = await getDataTransactionTempoDetailByDueDateId(
        resultDataDueDateById[0].transaction_due_date_id
      );
      const resultAllDetailTempoByTransactionId =
        await getAllDataTempoDetailByTransactionId(transactionId);
      resultDataDueDateById[0].tempoDetailId =
        resultDetailTempo[0].transaction_tempo_detail_id;
      resultDataDueDateById[0].description = resultDetailTempo[0].description;
      resultDataDueDateById[0].paidPrice = resultDetailTempo[0].paid_price;
      resultDataDueDateById[0].created_at = resultDetailTempo[0].created_at;
      resultDataDueDateById[0].tempo =
        resultAllDetailTempoByTransactionId.length;
      result = resultDataDueDateById[0];
    } else if (type === "titip") {
      const resultDueDate = await getDataDueDateTransactionByTransactionId(
        transactionId
      );
      let resultDataDueDateById = await getDataDueDateById(
        resultAddDueDate.insertId
      );
      resultDataDueDateById[0].titip = resultDueDate.length;
      result = resultDataDueDateById[0];
    }

    return res.json(Response(true, 201, `Added Due Date Successfully`, result));
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

exports.addTitipTransaction = async (req, res) => {
  let { transactionId, dueDateId, listSell, coordinate } = req.body;

  try {
    const resultTransaction = await getDataTransactionById(transactionId);
    if (!resultTransaction.length > 0) {
      return res.json(
        Response(false, 400, `Transaction Id Not Found`, {
          name: "transactionId",
        })
      );
    }

    const resultDueDate = await getDataDueDateById(dueDateId);
    if (!resultDueDate.length > 0) {
      return res.json(
        Response(false, 400, `Due Date Id Not Found`, {
          name: "dueDateId",
        })
      );
    }

    let resultDistance;
    if (resultTransaction[0].distributor_id_transaction) {
      const resultDistributor = await getDataDistributorById(
        resultTransaction[0].distributor_id_transaction
      );
      const latitudeDistributor = resultDistributor[0].latitude;
      const longitudeDistributor = resultDistributor[0].longitude;
      resultDistance = CalculateDistance(
        coordinate.latitude,
        coordinate.longitude,
        latitudeDistributor,
        longitudeDistributor
      );
    }

    if (resultTransaction[0].store_id_transaction) {
      const resultStore = await getDataStoreById(
        resultTransaction[0].store_id_transaction
      );
      const latitudeDistributor = resultStore[0].latitude;
      const longitudeDistributor = resultStore[0].longitude;
      resultDistance = CalculateDistance(
        coordinate.latitude,
        coordinate.longitude,
        latitudeDistributor,
        longitudeDistributor
      );
    }

    const resultConfigure = await getDataConfigureByModuleAndKey(
      "TRANSACTION",
      "radius"
    );
    if (
      resultDistance >
      parseFloat(ReplaceToRupiah(resultConfigure[0].value)).toFixed(1)
    ) {
      return res.json(
        Response(
          false,
          400,
          `max distance ${parseFloat(
            ReplaceToRupiah(resultConfigure[0].value)
          )}km`,
          {
            name: "distance",
          }
        )
      );
    }

    const arrListTitip = [];
    for (let i = 0; i < listSell.length; i++) {
      const resultDetailProduct = await getDetailTransactionProductById(
        listSell[i].transactionDetailProductId
      );
      let totalLeft = 0;
      const totalPrice =
        resultDetailProduct[0].sell_price * listSell[i].totalSell;

      if (resultDetailProduct[0].total_left === null) {
        totalLeft = resultDetailProduct[0].qty - listSell[i].totalSell;
      } else {
        totalLeft = resultDetailProduct[0].total_left - listSell[i].totalSell;
      }

      arrListTitip.push([
        transactionId,
        dueDateId,
        listSell[i].transactionDetailProductId,
        totalLeft,
        listSell[i].totalSell,
        totalPrice,
      ]);

      await updateTotalLefDetailProductById(
        listSell[i].transactionDetailProductId,
        totalLeft
      );
    }

    await addMultipleTransactionTitip(arrListTitip);
    await updateDataDueDateById(dueDateId, "", "", "2");

    const resultDataTitip = await getDataTransactionTitipDetailByTransactionId(
      transactionId
    );
    const totalPaidPrice = resultDataTitip.reduce((a, b) => {
      return a + b.total_price;
    }, 0);

    await updateTotalPaidPriceTransaction(transactionId, totalPaidPrice);

    return res.json(
      Response(true, 201, `Added Transaction In Out Product Successfully`, {
        totalPaidPrice,
      })
    );
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.checkDueDateStatus = async (req, res) => {
  try {
    const resultDueDate = await getAllDataDueDateTransactionByStatus("0");
    const dateNow = moment(new Date()).format("YYYY-MM-DD");
    for (let i = 0; i < resultDueDate.length; i++) {
      const endDate = moment(resultDueDate[i].end_date).format("YYYY-MM-DD");
      if (endDate < dateNow) {
        await updateMultipleDataDueDateStatusById([
          "1",
          resultDueDate[i].transaction_due_date_id,
        ]);
      }
    }
    return res.json(
      Response(true, 201, `Updated Due Date Status Successfully`, {})
    );
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getTotalSaleTransaction = async (req, res) => {
  const { periodType } = req.query;
  try {
    // let resultAllTransaction = await getDataTransactionAll();
    let resultGetData;
    if (periodType === "today") {
      const date = moment(new Date()).format("YYYY-MM-DD");
      resultGetData = await getDataTransactionByDate(periodType, date);
    } else if (periodType === "weekly") {
      console.log("weekly");
    } else if (periodType === "monthly") {
      console.log("monthly");
    } else if (periodType === "yearly") {
      console.log("yearly");
    }

    const series = [];
    for (let i = 0; i < resultGetData.length; i++) {
      for (let j = 0; j < resultGetData[i].product.length; j++) {
        series.push(resultGetData[i].product[j])
        // if (
        //   series
        //     .map((d) => d.name)
        //     .indexOf(resultGetData[i].product[j].name) === -1
        // ) {
        //   series.push({
        //     name: resultGetData[i].product[j].name,
        //     data: [],
        //   });
        // }
      }
    }
    console.log("series", series);

    return res.json(
      Response(true, 201, `Total Sale Transaction Successfully`, resultGetData)
    );
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
