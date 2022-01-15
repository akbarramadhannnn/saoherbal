const { getDataCategoryById } = require("../models/category");
const { getDataVariantById } = require("../models/variant");
const {
  getDataProductAll,
  addDataProduct,
  getDataProductById,
  deleteDataProductById,
  getDetailDataProduct,
} = require("../models/product");
const { addMultipleDataPrice } = require("../models/price");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

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
    if (!resultCategory.length > 0) {
      if (errCategory) {
        const error = JSON.stringify(errData, undefined, 2);
        return res.json(Response(false, 500, `Error`, JSON.parse(error)));
      }
      return res.json(Response(true, 400, `Category Id Not Found`, {}));
    } else {
      getDataVariantById(variant_id, (errVariant, resultVariant) => {
        if (errVariant) {
          const error = JSON.stringify(errVariant, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        } else if (!resultVariant.length > 0) {
          return res.json(Response(true, 400, `Variant Id Not Found`, {}));
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
  return res.json({ message: "Product Update" });
};

exports.deleteProductList = (req, res) => {
  const { id } = req.params;
  getDataProductById(id, (errData, resultData) => {
    if (errData) {
      const error = JSON.stringify(errData, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultData.length > 0) {
      return res.json(Response(false, 400, `Product Id Not Found`, {}));
    } else {
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
      return res.json(
        Response(true, 200, `Get Product Successfully`, result[0])
      );
    }
  });
};
