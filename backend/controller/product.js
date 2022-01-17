const axios = require("axios").default;
const { getDataCategoryById } = require("../models/category");
const { getDataVariantById } = require("../models/variant");
const {
  getDataProductAll,
  addDataProduct,
  getDataProductById,
  deleteDataProductById,
  getDetailDataProduct,
  updateDataProductById,
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

exports.getProductList = (req, res) => {
  getDataProductAll((err, result) => {
    if (err) {
      const error = JSON.stringify(err, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    }
    return res.json(Response(true, 200, `Get Product Successfully`, result));
  });
};

exports.addProductList = (req, res) => {
  let { name, category_id, variant_id, description, priceList, image } =
    req.body;
  name = ReplaceToStartUpperCase(name);
  getDataCategoryById(category_id, (errCategory, resultCategory) => {
    if (errCategory) {
      const error = JSON.stringify(errData, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultCategory.length > 0) {
      return res.json(
        Response(false, 400, `Category Id Not Found`, {
          name: "category_id",
        })
      );
    } else {
      getDataVariantById(variant_id, (errVariant, resultVariant) => {
        if (errVariant) {
          const error = JSON.stringify(errVariant, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        } else if (!resultVariant.length > 0) {
          return res.json(
            Response(false, 400, `Variant Id Not Found`, {
              name: "variant_id",
            })
          );
        } else {
          addDataProduct(
            name,
            category_id,
            variant_id,
            description,
            image,
            (errProduct, resultProduct) => {
              if (errProduct) {
                const error = JSON.stringify(errProduct, undefined, 2);
                return res.json(
                  Response(false, 500, `Error`, JSON.parse(error))
                );
              } else {
                const priceArr = [];
                for (let i = 0; i < priceList.length; i++) {
                  priceArr.push([
                    resultProduct.insertId,
                    priceList[i].weight,
                    priceList[i].price,
                    priceList[i].unit,
                  ]);
                }
                addMultipleDataPrice(priceArr, (errPrice, resultPrice) => {
                  if (errPrice) {
                    const error = JSON.stringify(errPrice, undefined, 2);
                    return res.json(
                      Response(false, 500, `Error`, JSON.parse(error))
                    );
                  } else {
                    return res.json(
                      Response(true, 200, `Added Product Successfully`, {})
                    );
                  }
                });
              }
            }
          );
        }
      });
    }
  });
};

exports.updateProductList = (req, res) => {
  let { id } = req.params;
  let { name, category_id, variant_id, description, priceList, image } =
    req.body;
  name = ReplaceToStartUpperCase(name);
  getDataProductById(id, (errGetProduct, resultGetProduk) => {
    if (errGetProduct) {
      const error = JSON.stringify(errGetProduct, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultGetProduk.length > 0) {
      return res.json(
        Response(false, 400, `Product Id Not Found`, {
          name: "product_id",
        })
      );
    } else {
      getDataCategoryById(category_id, (errCategory, resultCategory) => {
        if (errCategory) {
          const error = JSON.stringify(errCategory, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        } else if (!resultCategory.length > 0) {
          return res.json(
            Response(false, 400, `Category Id Not Found`, {
              name: "category_id",
            })
          );
        } else {
          getDataVariantById(variant_id, (errVariant, resultVariant) => {
            if (errVariant) {
              const error = JSON.stringify(errVariant, undefined, 2);
              return res.json(Response(false, 500, `Error`, JSON.parse(error)));
            } else if (!resultVariant.length > 0) {
              return res.json(
                Response(false, 400, `Variant Id Not Found`, {
                  name: "variant_id",
                })
              );
            } else {
              updateDataProductById(
                id,
                name,
                category_id,
                variant_id,
                description,
                image,
                (errProduct, resultProduct) => {
                  if (errProduct) {
                    const error = JSON.stringify(errProduct, undefined, 2);
                    return res.json(
                      Response(false, 500, `Error`, JSON.parse(error))
                    );
                  } else {
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
                        updateMultipleDataPrice(
                          [
                            priceList[i].weight,
                            priceList[i].price,
                            priceList[i].unit,
                            priceList[i].price_id,
                          ],
                          (errPrice, resultPrice) => {
                            if (errPrice) {
                              const error = JSON.stringify(
                                errPrice,
                                undefined,
                                2
                              );
                              return res.json(
                                Response(false, 500, `Error`, JSON.parse(error))
                              );
                            }
                          }
                        );
                      }
                    }

                    getPriceByProductId(id, (errPrice, resultPrice) => {
                      const idPriceArr = [];
                      for (var i = 0; i < resultPrice.length; i++) {
                        if (priceList[i] === undefined) {
                          idPriceArr.push([resultPrice[i].price_id]);
                        }
                      }

                      if (idPriceArr.length > 0) {
                        deleteMultipleDataPriceById(
                          idPriceArr,
                          (errDeletePrice, resultDeletePrice) => {
                            if (errDeletePrice) {
                              const error = JSON.stringify(
                                errDeletePrice,
                                undefined,
                                2
                              );
                              return res.json(
                                Response(false, 500, `Error`, JSON.parse(error))
                              );
                            }
                          }
                        );
                      }
                    });

                    if (addDataArr.length > 0) {
                      addMultipleDataPrice(
                        addDataArr,
                        (errAddPrice, resultAddPrice) => {
                          if (errAddPrice) {
                            const error = JSON.stringify(
                              errAddPrice,
                              undefined,
                              2
                            );
                            return res.json(
                              Response(false, 500, `Error`, JSON.parse(error))
                            );
                          }
                        }
                      );
                    }

                    return res.json(
                      Response(true, 200, `Updated Product Successfully`, {})
                    );
                  }
                }
              );
            }
          });
        }
      });
    }
  });
};

exports.deleteProductList = (req, res) => {
  const { id } = req.params;
  getDataProductById(id, (errData, resultData) => {
    if (errData) {
      const error = JSON.stringify(errData, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultData.length > 0) {
      return res.json(
        Response(false, 400, `Product Id Not Found`, {
          name: "product_id",
        })
      );
    } else {
      axios
        .delete(
          `${config.api_image.url_api_v1}/product/delete-single-image/${resultData[0].image}`
        )
        .then((responseDeleteImage) => {
          deleteDataProductById(id, (errorDelete, resultDelete) => {
            if (errorDelete) {
              const error = JSON.stringify(errorDelete, undefined, 2);
              return res.json(Response(false, 500, `Error`, JSON.parse(error)));
            } else {
              return res.json(
                Response(true, 200, `Deleted Product Successfully`, {})
              );
            }
          });
        });
    }
  });
};

exports.detailProduct = (req, res) => {
  const { id } = req.query;
  getDetailDataProduct(id, (err, result) => {
    if (err) {
      const error = JSON.stringify(err, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!result.length > 0) {
      return res.json(Response(true, 204, `Data Product Not Found`, {}));
    } else {
      getPriceByProductId(id, (errPrice, resultPrice) => {
        if (errPrice) {
          const error = JSON.stringify(errPrice, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        }
        result[0].priceList = resultPrice;
        return res.json(
          Response(true, 200, `Get Product Successfully`, result[0])
        );
      });
    }
  });
};
