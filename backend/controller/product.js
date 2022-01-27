const axios = require("axios").default;
const { getDataCategoryById } = require("../models/category");
const {
  getDataVariantById,
  getDataMatchCategoryAndVariantById,
} = require("../models/variant");
const {
  getDataProductAll,
  addDataProduct,
  getDataProductById,
  deleteDataProductById,
  getDetailDataProduct,
  updateDataProductById,
  getDataProductByNameNotById,
} = require("../models/product");
const {
  addMultipleDataPrice,
  getPriceByProductId,
  updateMultipleDataPrice,
  deleteMultipleDataPriceById,
} = require("../models/price");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");
const config = require("../config/env.json");

exports.getProductList = async (req, res) => {
  try {
    const result = await getDataProductAll();
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Product Not Found`, result));
    }
    // for (let i = 0; i < resultProduct.length; i++) {
    //   resultProduct[i].category = JSON.parse(resultProduct[i].category);
    //   resultProduct[i].variant = JSON.parse(resultProduct[i].variant);
    //   resultProduct[i].price_list = JSON.parse(resultProduct[i].price_list);
    // }
    return res.json(Response(true, 200, `Get Product Successfully`, result));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addProductList = async (req, res) => {
  let { name, category_id, variant_id, description, priceList, image } =
    req.body;
  name = ReplaceToStartUpperCase(name);

  try {
    const reusltCategoryById = await getDataCategoryById(category_id);
    if (!reusltCategoryById.length > 0) {
      return res.json(
        Response(false, 400, `Category Id Not Found`, {
          name: "category_id",
        })
      );
    }

    const resultVariantById = await getDataVariantById(variant_id);
    if (!resultVariantById.length > 0) {
      return res.json(
        Response(false, 400, `Variant Id Not Found`, {
          name: "variant_id",
        })
      );
    }

    const resultVariantByCategoryId = await getDataMatchCategoryAndVariantById(
      variant_id,
      category_id
    );
    if (!resultVariantByCategoryId.length > 0) {
      return res.json(
        Response(false, 400, `Variant Id Not Match With Category Id`, {
          name: "variant_id",
        })
      );
    }

    const resultAddProduct = await addDataProduct(
      name,
      category_id,
      variant_id,
      description,
      image
    );

    const priceArr = [];
    for (let i = 0; i < priceList.length; i++) {
      priceArr.push([
        resultAddProduct.insertId,
        priceList[i].weight,
        priceList[i].price,
        priceList[i].unit,
      ]);
    }
    await addMultipleDataPrice(priceArr);
    return res.json(Response(true, 201, `Added Product Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateProductList = async (req, res) => {
  let { id } = req.params;
  let { name, category_id, variant_id, description, priceList, image } =
    req.body;
  name = ReplaceToStartUpperCase(name);

  try {
    const resultProductById = await getDataProductById(id);
    if (!resultProductById.length > 0) {
      return res.json(
        Response(false, 400, `Product Id Not Found`, {
          name: "product_id",
        })
      );
    }

    const reusltCategoryById = await getDataCategoryById(category_id);
    if (!reusltCategoryById.length > 0) {
      return res.json(
        Response(false, 400, `Category Id Not Found`, {
          name: "category_id",
        })
      );
    }

    const resultVariantById = await getDataVariantById(variant_id);
    if (!resultVariantById.length > 0) {
      return res.json(
        Response(false, 400, `Variant Id Not Found`, {
          name: "variant_id",
        })
      );
    }

    const resultVariantByCategoryId = await getDataMatchCategoryAndVariantById(
      variant_id,
      category_id
    );
    if (!resultVariantByCategoryId.length > 0) {
      return res.json(
        Response(false, 400, `Variant Id Not Match With Category Id`, {
          name: "variant_id",
        })
      );
    }

    const resultProductByNameNotById = await getDataProductByNameNotById(
      name,
      id
    );
    if (resultProductByNameNotById.length > 0) {
      return res.json(
        Response(false, 400, `Name Has Already`, {
          name: "name",
        })
      );
    }

    await updateDataProductById(
      id,
      name,
      category_id,
      variant_id,
      description,
      image
    );

    const addDataArr = [];
    for (let i = 0; i < priceList.length; i++) {
      if (priceList[i].price_id === undefined) {
        addDataArr.push([
          resultGetProduk[0].product_id,
          priceList[i].weight,
          priceList[i].price,
          priceList[i].unit,
        ]);
      } else {
        await updateMultipleDataPrice([
          priceList[i].weight,
          priceList[i].price,
          priceList[i].unit,
          priceList[i].price_id,
        ]);
      }
    }

    const resultPriceByProductId = await getPriceByProductId(id);
    const idPriceArr = [];
    for (var i = 0; i < resultPriceByProductId.length; i++) {
      if (priceList[i] === undefined) {
        idPriceArr.push([resultPriceByProductId[i].price_id]);
      }
    }

    if (idPriceArr.length > 0) {
      await deleteMultipleDataPriceById(idPriceArr);
    }

    if (addDataArr.length > 0) {
      await addMultipleDataPrice(addDataArr);
    }

    return res.json(Response(true, 201, `Updated Product Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.deleteProductList = async (req, res) => {
  const { id } = req.params;

  try {
    const resultProductById = await getDataProductById(id);
    if (!resultProductById.length > 0) {
      return res.json(
        Response(false, 400, `Product Id Not Found`, {
          name: "product_id",
        })
      );
    }

    await axios.delete(
      `${config.api_image.url_api_v1}/product/delete-single-image/${resultProductById[0].image}`
    );

    await deleteDataProductById(id);

    return res.json(Response(true, 200, `Deleted Product Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.detailProduct = async (req, res) => {
  const { id } = req.query;

  try {
    const resultDetailProduct = await getDetailDataProduct(id);
    console.log("resultDetailProduct", resultDetailProduct);

    if (!resultDetailProduct.length > 0) {
      return res.json(Response(true, 204, `Data Product Not Found`, {}));
    }

    const resultPrice = await getPriceByProductId(id);
    resultDetailProduct[0].priceList = resultPrice;
    return res.json(
      Response(true, 200, `Get Product Successfully`, resultDetailProduct[0])
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
