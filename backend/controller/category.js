const {
  getDataCategoryAll,
  addDataCategory,
  getDataCategoryById,
  updateDataCategoryById,
  deleteDataCategoryById,
  getDetailDataCategory,
  getDataCategoryByName,
  getDataCategoryByNameNotById,
  getTotalDataCategory,
} = require("../models/category");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

exports.getCategoryList = async (req, res) => {
  let search = req.query.search || "";

  // Pagination
  const pagination = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  try {
    const resultTotalCategory = await getTotalDataCategory(search);
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

    const result = await getDataCategoryAll(startIndex, limit, search);
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Category Successfully`, {}));
    }

    return res.json(
      Response(true, 200, `Get Category Successfully`, {
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

exports.addCategoryList = async (req, res) => {
  let { name } = req.body;
  name = ReplaceToStartUpperCase(name);
  try {
    const resultCategoryname = await getDataCategoryByName(name);
    if (resultCategoryname.length > 0) {
      return res.json(
        Response(false, 400, `Category Name has Already`, {
          name: "name",
        })
      );
    }
    await addDataCategory(name);
    return res.json(Response(true, 201, `Added Category Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateCategoryList = async (req, res) => {
  let { name } = req.body;
  const { id } = req.params;
  name = ReplaceToStartUpperCase(name);

  try {
    const resultCategoryId = await getDataCategoryById(id);
    if (!resultCategoryId.length > 0) {
      return res.json(
        Response(false, 400, `Category Id not found`, {
          name: "category_id",
        })
      );
    }

    const resultCategoryNameNotById = await getDataCategoryByNameNotById(
      name,
      id
    );
    if (resultCategoryNameNotById.length > 0) {
      return res.json(
        Response(false, 400, `Category Name has Already`, {
          name: "name",
        })
      );
    }

    await updateDataCategoryById(id, name);
    return res.json(Response(true, 201, `Updated Category Successfully`, {}));
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.deleteCategoryList = async (req, res) => {
  const { id } = req.params;

  try {
    const resultCategoryId = await getDataCategoryById(id);
    if (!resultCategoryId.length > 0) {
      return res.json(
        Response(false, 400, `Category Id Not Found`, {
          name: "category_id",
        })
      );
    }

    await deleteDataCategoryById(id);
    return res.json(Response(true, 200, `Deleted Category Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.detailCategory = async (req, res) => {
  const { id } = req.query;

  try {
    const result = await getDetailDataCategory(id);
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Data Category Not Found`, {}));
    }
    return res.json(
      Response(true, 200, `Get Category Successfully`, result[0])
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
