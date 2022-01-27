const {
  getDataVariantAll,
  getDataVariantById,
  addDataVariant,
  updateDataVariantById,
  deleteDataVariantById,
  getDetailDataVariant,
  getDataVariantByName,
  getDataVariantByNameNotById,
} = require("../models/variant");
const { getDataCategoryById } = require("../models/category");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

exports.getVariantList = async (req, res) => {
  const categoryId = req.query.categoryId || "";
  try {
    const result = await getDataVariantAll(categoryId);
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Variant Successfully`, result));
    }
    return res.json(Response(true, 200, `Get Variant Successfully`, result));
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
  const { id } = req.query;

  try {
    const result = await getDetailDataVariant(id);
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Data Variant Not Found`, {}));
    }

    return res.json(Response(true, 200, `Get Variant Successfully`, result[0]));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
