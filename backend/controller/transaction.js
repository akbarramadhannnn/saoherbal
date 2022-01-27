const GenerateCodeTransaction = require("../utils/generateCodeTransaction");
const {
  getDataTransactionAll,
  addDataTransaction,
} = require("../models/transaction");
const { getDataStoreById } = require("../models/store");
const { getDataDistributorById } = require("../models/distributor");
const { getDataProductById } = require("../models/product");
const {
  getDataPriceById,
  getDataPriceByIdAndProductId,
} = require("../models/price");
const Response = require("../helpers/response");

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
  const { consumer_type, product_id, price_id, qty, sub_total } = req.body;

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

    const code = GenerateCodeTransaction(consumer_type, id);
    await addDataTransaction(
      store_id,
      distributor_id,
      product_id,
      price_id,
      code,
      consumer_type,
      qty,
      sub_total
    );
    return res.json(Response(true, 201, `Added Transaction Successfully`, {}));
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
