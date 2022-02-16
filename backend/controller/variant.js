const {
  getDataVariantAll,
  getDataVariantById,
  addDataVariant,
  updateDataVariantById,
  deleteDataVariantById,
  getDetailDataVariant,
  getDataVariantByName,
  getDataVariantByNameNotById,
  getTotalDataVariant,
} = require("../models/variant");
const { getDataCategoryById } = require("../models/category");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

exports.getVariantList = async (req, res) => {
  let search = req.query.search || "";

  // Pagination
  const pagination = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const resultTotalCategory = await getTotalDataVariant(search);
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

    const result = await getDataVariantAll(startIndex, limit, search);
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Variant Successfully`, {}));
    }
    return res.json(
      Response(true, 200, `Get Variant Successfully`, {
        data: result,
        totalPage,
        pagination,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addVariantList = async (req, res) => {
  let { category_id, name } = req.body;
  name = ReplaceToStartUpperCase(name);

  try {
    const resultCategoryById = await getDataCategoryById(category_id);
    if (!resultCategoryById.length > 0) {
      return res.json(
        Response(false, 400, `Category Not Found`, {
          name: "category_id",
        })
      );
    }

    const resultVariantByName = await getDataVariantByName(name);
    if (resultVariantByName.length > 0) {
      return res.json(
        Response(false, 400, `Variant Name has Already`, {
          name: "name",
        })
      );
    }

    await addDataVariant(category_id, name);
    return res.json(Response(true, 201, `Added Variant Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateVariantList = async (req, res) => {
  let { category_id, name } = req.body;
  const { id } = req.params;
  name = ReplaceToStartUpperCase(name);

  try {
    const resultVariantById = await getDataVariantById(id);
    if (!resultVariantById.length > 0) {
      return res.json(
        Response(false, 400, `Variant Id not found`, {
          name: "variant_id",
        })
      );
    }

    const resultCategoryById = await getDataCategoryById(category_id);
    if (!resultCategoryById.length > 0) {
      return res.json(
        Response(false, 400, `Category Not Found`, {
          name: "category_id",
        })
      );
    }

    const resultVariantByNameNotById = await getDataVariantByNameNotById(
      name,
      id
    );
    if (resultVariantByNameNotById.length > 0) {
      return res.json(
        Response(false, 400, `Variant Name has Already`, {
          name: "name",
        })
      );
    }

    await updateDataVariantById(id, category_id, name);
    return res.json(Response(true, 201, `Updated Variant Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.deleteVariantList = async (req, res) => {
  const { id } = req.params;

  try {
    const resultVariantById = await getDataVariantById(id);
    if (!resultVariantById.length > 0) {
      return res.json(
        Response(false, 400, `Variant Id Not Found`, {
          name: "variant_id",
        })
      );
    }

    await deleteDataVariantById(id);
    return res.json(Response(true, 200, `Deleted Variant Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.detailVariant = async (req, res) => {
  const { id, categoryId } = req.query;

  try {
    let resultData;

    if (id) {
      const result = await getDetailDataVariant(id, categoryId);
      if (!result.length > 0) {
        return res.json(Response(true, 204, `Data Variant Not Found`, {}));
      }
      resultData = result[0];
    }

    if (categoryId) {
      const result = await getDetailDataVariant(id, categoryId);
      if (!result.length > 0) {
        return res.json(
          Response(true, 204, `Data Variant By Category Id Not Found`, {})
        );
      }
      resultData = result;
    }

    return res.json(Response(true, 200, `Get Variant Successfully`, resultData));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
